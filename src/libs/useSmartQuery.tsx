import { useLocation, useNavigate } from 'react-router-dom';

export const useSmartQueryParams = (keys: string[]) => {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const params = Object.fromEntries(
        keys.map(k => [k, query.get(k) || ''])
    );

    const setParams = (updates: Record<string, string>) => {
        keys.forEach(k => {
            if (updates[k]) query.set(k, updates[k]);
        });
        navigate({ search: query.toString() }, { replace: true });
    }; 

    return [params, setParams] as const;
};
