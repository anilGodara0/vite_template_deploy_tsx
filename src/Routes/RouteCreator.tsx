/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:25:58
 * @modify date 2024-10-25 11:25:58
 * @desc It will create the Route and Import it lazy 
 */


// src/Route/createRoutes.tsx
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import routeConfig, { componentMap } from './RouteTree'; // Import the route configuration
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import LoaderHtml from '../LoaderHtml';
import PageLayout from '../Global/PageLayout/PageLayout';


const loadComponent = async (componentName: string) => {
  if (componentMap[componentName]) {
    const component = await componentMap[componentName]();
    return component.default;
  } else {
    throw new Error(`Component ${componentName} not found`);
  }
};

interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
  protected?: boolean;
  isProtected?: boolean;
}

interface CreateRoutesProps {
  isAuthenticated?: boolean;
}

const CreateRoutes: React.FC<CreateRoutesProps> = ({ isAuthenticated = false }) => {
  const [routes, setRoutes] = useState<RouteConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      const loadedRoutes = await Promise.all(
        routeConfig.map(async (route: any) => {
          const { path, element, children, protected: isProtected, renderLayout } = route;
          const Component = await loadComponent(element);
          return { path, element: <Component />, isProtected, children, renderLayout };
        })
      );
      setRoutes(loadedRoutes);
      setLoading(false);
    };

    fetchRoutes();
  }, []);

  if (loading) return <LoaderHtml />;

  return (
    <Routes>
      {routes.map((route: any) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.isProtected ? (
              <ProtectedRoute isAuthenticated={isAuthenticated} element={route?.renderLayout ? <PageLayout>{route.element}</PageLayout> : route.element}>
              </ProtectedRoute>
            ) : (
              route?.renderLayout ? <PageLayout>
                {route.element}
              </PageLayout> : route?.element
            )
          }
        >
        </Route>
      ))}
    </Routes>
  );
};

export default CreateRoutes;
