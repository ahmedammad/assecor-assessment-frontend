import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, delay, map, startWith } from 'rxjs/operators';

export interface DataView<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DataViewService {

  getDataView<T extends { url: string }>(
    urls: string[],
    signal: () => T[] | null,
    updateFn: (items: T[]) => void,
    fetchFn: (url: string) => Observable<T>,
    entityName: string
  ): Observable<DataView<T>> {
    if (!urls?.length) {
      return of({ items: [], isLoading: false, error: null, showAll: false });
    }

    const cachedItems = signal() || [];
    const cachedMap = new Map(cachedItems.map(item => [item.url, item]));
    const missingUrls = urls.filter(url => !cachedMap.has(url));

    if (missingUrls.length === 0) {
      const items = urls.map(url => cachedMap.get(url)!);
      return of({ items, isLoading: false, error: null, showAll: false });
    }

    const requests$ = missingUrls.map(url =>
      fetchFn(url).pipe(catchError(() => of(null)))
    );

    return forkJoin(requests$).pipe(
      map(results => {
        const valid = results.filter((r): r is T => r !== null);
        updateFn(valid);

        const items = urls.map(url => cachedMap.get(url) || valid.find(v => v.url === url) || null)
          .filter((v): v is T => v !== null);

        return {
          items,
          isLoading: false,
          error: items.length === 0 ? `Failed to load ${entityName}` : null,
          showAll: false
        };
      }),
      delay(2000),
      startWith({ items: [], isLoading: true, error: null, showAll: false }),
      catchError(() => of({ items: [], isLoading: false, error: `Failed to load ${entityName}`, showAll: false }))
    );
  }
}
