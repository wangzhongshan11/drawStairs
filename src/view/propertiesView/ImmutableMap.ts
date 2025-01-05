
export class ImmutableMap<K, V> implements ReadonlyMap<K, V> {
    private _map: Map<K, V>;

    constructor(copyFromMap?: Map<K, V> | ImmutableMap<K, V>, doCopy = true) {
        if (copyFromMap) {
            const actualMap = (copyFromMap as ImmutableMap<K, V>)._map || copyFromMap;
            this._map = doCopy ? new Map(actualMap) : actualMap;
        } else {
            this._map = new Map();
        }
    }

    has(key: K): boolean {
        return this._map.has(key);
    }

    get(key: K): V | undefined {
        return this._map.get(key);
    }

    set(key: K, val: V): ImmutableMap<K, V> {
        if (this._map.get(key) === val) {
            return this;
        } else {
            const result = new ImmutableMap(this);
            result._map.set(key, val);
            return result;
        }
    }

    batchSet(data: [K, V][]): ImmutableMap<K, V> {
        let cloned = false;
        let result: ImmutableMap<K, V> = this;
        data.forEach(([key, val]) => {
            if (this._map.get(key) !== val) {
                if (!cloned) {
                    result = new ImmutableMap(this);
                    cloned = true;
                }
                result._map.set(key, val);
            }
        });
        return result;
    }

    delete(key: K): ImmutableMap<K, V> {
        if (this._map.get(key)) {
            const result = new ImmutableMap(this);
            result._map.delete(key);
            return result;
        } else {
            return this;
        }
    }

    get size() {
        return this._map.size;
    }

    forEach(iteratee: (val: V, key: K, map: ReadonlyMap<K, V>) => void) {
        this._map.forEach(iteratee);
    }

    map<Item>(mapper: (val: V, key: K) => Item): Item[] {
        const items: Item[] = [];
        this._map.forEach((val, key) => {
            items.push(mapper(val, key));
        });
        return items;
    }

    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }

    keys() {
        return this._map.keys();
    }

    values() {
        return this._map.values();
    }

    entries() {
        return this._map.entries();
    }
}