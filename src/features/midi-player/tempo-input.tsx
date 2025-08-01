import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { Input } from '@/components/ui/input';

const useDocumentKeydown = (
  handler: (event: KeyboardEvent) => void | undefined,
) => {
  const handlerRef =
    React.useRef<(event: KeyboardEvent) => void | undefined>(undefined);
  const teardown = () => {
    if (handlerRef.current !== undefined) {
      document.removeEventListener('keydown', handlerRef.current);
      handlerRef.current = undefined;
    }
  };
  useEffect(() => {
    if (handler === handlerRef.current) return;
    teardown();
    if (handler !== undefined) {
      handlerRef.current = handler;
      document.addEventListener('keydown', handler);
    }
    return teardown;
  }, [handler]);
};

interface TempoInputProps {
  tempo: number;
  onChange: (tempo: number) => void;
}

export const TempoInput = (props: TempoInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  type State =
    | { type: 'idle' }
    | { type: 'editing'; value: string }
    | { type: 'updated'; value: number };
  const idle = (): State => ({ type: 'idle' }) as const;
  type Action =
    | { type: 'click' }
    | { type: 'done-updating' }
    | { type: 'change'; value: string }
    | { type: 'blur'; value: string }
    | { type: 'keydown'; key: string; value: string };
  const parseEditedValue = (state: State): number => {
    if (state.type !== 'editing') return props.tempo;
    const parsed = Number.parseInt(state.value, 10);
    if (Number.isNaN(parsed)) {
      return props.tempo;
    }
    return Math.min(Math.max(parsed, 0), 666);
  };
  const finishEditing = (state: State): State => {
    const newTempo = parseEditedValue(state);
    return { type: 'updated', value: newTempo };
  };
  const updateNumeric = (state: State, f: (value: number) => number): State => {
    if (state.type === 'editing') {
      const parsed = parseEditedValue(state);
      return {
        ...state,
        value: f(parsed).toString(),
      };
    }
    return state;
  };
  const [state, dispatch] = React.useReducer((state, action: Action): State => {
    if (state.type === 'idle') {
      if (action.type === 'click') {
        return {
          type: 'editing',
          value: props.tempo.toString(),
        };
      }
      return state;
    } else if (state.type === 'editing') {
      switch (action.type) {
        case 'change': {
          return {
            ...state,
            value: action.value,
          };
        }
        case 'blur': {
          return finishEditing(state);
        }
        case 'keydown': {
          switch (action.key) {
            case 'Enter': {
              return finishEditing(state);
            }
            case 'Escape': {
              return finishEditing({
                ...state,
                value: props.tempo.toString(),
              });
            }
            case 'ArrowUp': {
              return updateNumeric(state, value => value + 1);
            }
            case 'ArrowDown': {
              return updateNumeric(state, value => value - 1);
            }
            case 'PageUp': {
              return updateNumeric(state, value => value + 10);
            }
            case 'PageDown': {
              return updateNumeric(state, value => value - 10);
            }
          }
        }
      }
    } else if (state.type === 'updated' && action.type === 'done-updating') {
      return idle();
    }
    return state;
  }, idle());
  useEffect(() => {
    const input = inputRef.current;
    if (input === null) return;
    if (state.type === 'editing') {
      input.select();
    } else if (state.type === 'idle') {
      setTimeout(() => {
        input.blur();
      }, 0);
    }
  }, [state.type]);
  useEffect(() => {
    if (state.type === 'updated' && state.value !== props.tempo) {
      props.onChange(state.value);
      dispatch({ type: 'done-updating' });
    }
  }, [props, state]);
  const displayValue = () => {
    switch (state.type) {
      case 'idle': {
        return `${props.tempo.toString()} BPM`;
      }
      case 'updated': {
        return `${state.value.toString()} BPM`;
      }
      case 'editing': {
        return state.value;
      }
    }
  };
  useDocumentKeydown(
    useCallback(event => {
      if (event.key === 'Escape') {
        dispatch({
          type: 'keydown',
          key: 'Escape',
          value: inputRef.current?.value ?? '',
        });
      }
    }, []),
  );
  return (
    <div className="w-[5.3em]">
      <div>
        <Input
          onClick={() => dispatch({ type: 'click' })}
          pattern="[0-9]*"
          size={3}
          inputMode={'decimal'}
          style={{ textAlign: 'center' }}
          ref={inputRef}
          value={displayValue()}
          onChange={event =>
            dispatch({ type: 'change', value: event.target.value })
          }
          onBlur={event =>
            dispatch({ type: 'blur', value: event.target.value })
          }
          onKeyDown={event =>
            dispatch({
              type: 'keydown',
              key: event.key,
              value:
                'value' in event.target
                  ? typeof event.target.value === 'string'
                    ? event.target.value
                    : ''
                  : '',
            })
          }
        />
      </div>
    </div>
  );
};
