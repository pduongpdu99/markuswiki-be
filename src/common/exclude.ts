import { RequestMethod } from "@nestjs/common";

export const ROUTE_EXCLUDE = [
    {
        path: '/categories',
        method: RequestMethod.POST,
    },
    {
        path: '/categories/:id',
        method: RequestMethod.PATCH,
    },
    {
        path: '/categories/:id',
        method: RequestMethod.DELETE,
    },
    {
        path: '/tags',
        method: RequestMethod.POST,
    },
    {
        path: '/tags/:id',
        method: RequestMethod.PATCH,
    },
    {
        path: '/tags/:id',
        method: RequestMethod.DELETE,
    },
    {
        path: '/article',
        method: RequestMethod.POST,
    },
    {
        path: '/article/:id',
        method: RequestMethod.PATCH,
    },
    {
        path: '/article/:id',
        method: RequestMethod.DELETE,
    }
]