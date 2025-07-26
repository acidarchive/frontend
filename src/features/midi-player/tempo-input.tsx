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
      console.log('REMOVE');
      handlerRef.current = undefined;
    }
  };
  useEffect(() => {
    if (handler === handlerRef.current) return;
    teardown();
    if (handler !== undefined) {
      handlerRef.current = handler;
      console.log('ADD');
      document.addEventListener('keydown', handler);
    }
    return teardown;
  }, [handler]);
};

export const TempoInput = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  type State =
    | { type: 'idle'; value: number }
    | { type: 'editing'; value: string; oldValue: number };
  const idle = (value: number): State => ({ type: 'idle', value }) as const;
  type Action =
    | { type: 'click' }
    | { type: 'change'; value: string }
    | { type: 'blur'; value: string }
    | { type: 'keydown'; key: string; value: string };
  const parseEditedValue = (state: State): number => {
    if (state.type !== 'editing') return state.value;
    const parsed = Number.parseInt(state.value, 10);
    if (Number.isNaN(parsed)) {
      return state.oldValue;
    }
    return parsed;
  };
  const finishEditing = (state: State): State => {
    return idle(parseEditedValue(state));
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
      switch (action.type) {
        case 'click': {
          return {
            type: 'editing',
            value: state.value.toString(),
            oldValue: state.value,
          };
        }
        default: {
          return state;
        }
      }
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
          if (action.key === 'Enter') {
            return finishEditing(state);
          } else if (action.key === 'Escape') {
            return finishEditing({
              ...state,
              value: state.oldValue.toString(),
            });
          } else if (action.key === 'ArrowUp') {
            return updateNumeric(state, value => value + 1);
          } else if (action.key === 'ArrowDown') {
            return updateNumeric(state, value => value - 1);
          } else if (action.key === 'PageUp') {
            return updateNumeric(state, value => value + 10);
          } else if (action.key === 'PageDown') {
            return updateNumeric(state, value => value - 10);
          }
        }
      }
    }
    return state;
  }, idle(120));
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
  const value = state.type === 'idle' ? `${state.value} BPM` : state.value;
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
          value={value}
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
