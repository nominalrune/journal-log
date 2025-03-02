// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Project from '../models/Project';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

// Define a service using a base URL and expected endpoints
export const projectApi = createApi({
	reducerPath: 'projectApi',
	baseQuery: async (
		args,
		{ signal, dispatch, getState },
		extraOptions,
	) => {
		try {
			const projects = await Project.list();
			return { data: projects };
		} catch (error) {
			return { error };
		}
	},
	endpoints: (builder) => ({
		getProjects: builder.query<Project[], string>({
			queryFn: async (a,b,query?: Prisma.ProjectFindManyArgs<DefaultArgs>) => {
				try {
					const projects = await Project.list(query);
					return { data: projects };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProjectsQuery } = projectApi;