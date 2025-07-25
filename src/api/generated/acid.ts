/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * acid
 * API for acidarchive.com
 * OpenAPI spec version: 0.0.1-alpha.9
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  CreateTB303Pattern,
  ListTb303PatternsParams,
  PaginatedResponseTB303PatternSummary,
  PatternTB303Response,
  TB303Pattern
} from './model';

import { customInstance } from '../mutator/custom-instance';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export const listTb303Patterns = (
    params?: ListTb303PatternsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PaginatedResponseTB303PatternSummary>(
      {url: `/v1/patterns/tb303`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getListTb303PatternsQueryKey = (params?: ListTb303PatternsParams,) => {
    return [`/v1/patterns/tb303`, ...(params ? [params]: [])] as const;
    }

    
export const getListTb303PatternsQueryOptions = <TData = Awaited<ReturnType<typeof listTb303Patterns>>, TError = void>(params?: ListTb303PatternsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTb303Patterns>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListTb303PatternsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listTb303Patterns>>> = ({ signal }) => listTb303Patterns(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listTb303Patterns>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListTb303PatternsQueryResult = NonNullable<Awaited<ReturnType<typeof listTb303Patterns>>>
export type ListTb303PatternsQueryError = void


export function useListTb303Patterns<TData = Awaited<ReturnType<typeof listTb303Patterns>>, TError = void>(
 params: undefined |  ListTb303PatternsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTb303Patterns>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTb303Patterns>>,
          TError,
          Awaited<ReturnType<typeof listTb303Patterns>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListTb303Patterns<TData = Awaited<ReturnType<typeof listTb303Patterns>>, TError = void>(
 params?: ListTb303PatternsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTb303Patterns>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTb303Patterns>>,
          TError,
          Awaited<ReturnType<typeof listTb303Patterns>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListTb303Patterns<TData = Awaited<ReturnType<typeof listTb303Patterns>>, TError = void>(
 params?: ListTb303PatternsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTb303Patterns>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useListTb303Patterns<TData = Awaited<ReturnType<typeof listTb303Patterns>>, TError = void>(
 params?: ListTb303PatternsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listTb303Patterns>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListTb303PatternsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const createTb303Pattern = (
    createTB303Pattern: CreateTB303Pattern,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PatternTB303Response>(
      {url: `/v1/patterns/tb303`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createTB303Pattern, signal
    },
      options);
    }
  


export const getCreateTb303PatternMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTb303Pattern>>, TError,{data: CreateTB303Pattern}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof createTb303Pattern>>, TError,{data: CreateTB303Pattern}, TContext> => {

const mutationKey = ['createTb303Pattern'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createTb303Pattern>>, {data: CreateTB303Pattern}> = (props) => {
          const {data} = props ?? {};

          return  createTb303Pattern(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateTb303PatternMutationResult = NonNullable<Awaited<ReturnType<typeof createTb303Pattern>>>
    export type CreateTb303PatternMutationBody = CreateTB303Pattern
    export type CreateTb303PatternMutationError = void

    export const useCreateTb303Pattern = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTb303Pattern>>, TError,{data: CreateTB303Pattern}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof createTb303Pattern>>,
        TError,
        {data: CreateTB303Pattern},
        TContext
      > => {

      const mutationOptions = getCreateTb303PatternMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
export const getRandomTb303Pattern = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TB303Pattern>(
      {url: `/v1/patterns/tb303/random`, method: 'GET', signal
    },
      options);
    }
  

export const getGetRandomTb303PatternQueryKey = () => {
    return [`/v1/patterns/tb303/random`] as const;
    }

    
export const getGetRandomTb303PatternQueryOptions = <TData = Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError = void>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetRandomTb303PatternQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getRandomTb303Pattern>>> = ({ signal }) => getRandomTb303Pattern(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetRandomTb303PatternQueryResult = NonNullable<Awaited<ReturnType<typeof getRandomTb303Pattern>>>
export type GetRandomTb303PatternQueryError = void


export function useGetRandomTb303Pattern<TData = Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError = void>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRandomTb303Pattern>>,
          TError,
          Awaited<ReturnType<typeof getRandomTb303Pattern>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetRandomTb303Pattern<TData = Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError = void>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getRandomTb303Pattern>>,
          TError,
          Awaited<ReturnType<typeof getRandomTb303Pattern>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetRandomTb303Pattern<TData = Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError = void>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetRandomTb303Pattern<TData = Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError = void>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getRandomTb303Pattern>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetRandomTb303PatternQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const getTb303Pattern = (
    patternId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TB303Pattern>(
      {url: `/v1/patterns/tb303/${patternId}`, method: 'GET', signal
    },
      options);
    }
  

export const getGetTb303PatternQueryKey = (patternId: string,) => {
    return [`/v1/patterns/tb303/${patternId}`] as const;
    }

    
export const getGetTb303PatternQueryOptions = <TData = Awaited<ReturnType<typeof getTb303Pattern>>, TError = void>(patternId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTb303Pattern>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTb303PatternQueryKey(patternId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTb303Pattern>>> = ({ signal }) => getTb303Pattern(patternId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(patternId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTb303Pattern>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetTb303PatternQueryResult = NonNullable<Awaited<ReturnType<typeof getTb303Pattern>>>
export type GetTb303PatternQueryError = void


export function useGetTb303Pattern<TData = Awaited<ReturnType<typeof getTb303Pattern>>, TError = void>(
 patternId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTb303Pattern>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTb303Pattern>>,
          TError,
          Awaited<ReturnType<typeof getTb303Pattern>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetTb303Pattern<TData = Awaited<ReturnType<typeof getTb303Pattern>>, TError = void>(
 patternId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTb303Pattern>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTb303Pattern>>,
          TError,
          Awaited<ReturnType<typeof getTb303Pattern>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetTb303Pattern<TData = Awaited<ReturnType<typeof getTb303Pattern>>, TError = void>(
 patternId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTb303Pattern>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGetTb303Pattern<TData = Awaited<ReturnType<typeof getTb303Pattern>>, TError = void>(
 patternId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTb303Pattern>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetTb303PatternQueryOptions(patternId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const updateTb303Pattern = (
    patternId: string,
    createTB303Pattern: CreateTB303Pattern,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<PatternTB303Response>(
      {url: `/v1/patterns/tb303/${patternId}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: createTB303Pattern
    },
      options);
    }
  


export const getUpdateTb303PatternMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTb303Pattern>>, TError,{patternId: string;data: CreateTB303Pattern}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof updateTb303Pattern>>, TError,{patternId: string;data: CreateTB303Pattern}, TContext> => {

const mutationKey = ['updateTb303Pattern'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateTb303Pattern>>, {patternId: string;data: CreateTB303Pattern}> = (props) => {
          const {patternId,data} = props ?? {};

          return  updateTb303Pattern(patternId,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateTb303PatternMutationResult = NonNullable<Awaited<ReturnType<typeof updateTb303Pattern>>>
    export type UpdateTb303PatternMutationBody = CreateTB303Pattern
    export type UpdateTb303PatternMutationError = void

    export const useUpdateTb303Pattern = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTb303Pattern>>, TError,{patternId: string;data: CreateTB303Pattern}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof updateTb303Pattern>>,
        TError,
        {patternId: string;data: CreateTB303Pattern},
        TContext
      > => {

      const mutationOptions = getUpdateTb303PatternMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
export const deleteTb303Pattern = (
    patternId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/v1/patterns/tb303/${patternId}`, method: 'DELETE'
    },
      options);
    }
  


export const getDeleteTb303PatternMutationOptions = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTb303Pattern>>, TError,{patternId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteTb303Pattern>>, TError,{patternId: string}, TContext> => {

const mutationKey = ['deleteTb303Pattern'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTb303Pattern>>, {patternId: string}> = (props) => {
          const {patternId} = props ?? {};

          return  deleteTb303Pattern(patternId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteTb303PatternMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTb303Pattern>>>
    
    export type DeleteTb303PatternMutationError = void

    export const useDeleteTb303Pattern = <TError = void,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTb303Pattern>>, TError,{patternId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteTb303Pattern>>,
        TError,
        {patternId: string},
        TContext
      > => {

      const mutationOptions = getDeleteTb303PatternMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
