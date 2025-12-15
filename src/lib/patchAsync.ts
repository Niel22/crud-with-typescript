import { Router, Request, Response, NextFunction } from "express";

/**
 * Patch Express Router globally to automatically handle async errors.
 * Call this once in your app/server entry file.
 */

export function patchRouterAsync(): void {
  const originalRoute = Router.prototype.route;

  Router.prototype.route = function (path: string) {
    const route = originalRoute.call(this, path);

    const wrapAsync = (
      fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
    ) => {
      return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
      };
    };

    
    (["get", "post", "put", "delete", "patch", "options", "head"] as const).forEach(
      (method) => {
        const originalMethod = (route as any)[method];
        (route as any)[method] = function (...handlers: any[]) {
          const wrappedHandlers = handlers.map((h) =>
            typeof h === "function" ? wrapAsync(h) : h
          );
          return originalMethod.apply(route, wrappedHandlers);
        };
      }
    );

    return route;
  };
}
