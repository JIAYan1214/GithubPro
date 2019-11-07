import LRU from 'lru-cache';

const REPO_CACHE = new LRU({
    maxAge:1000*60*60
});

export function cache(repo) {
    const full_name = repo.full_name;
    REPO_CACHE.set(full_name,repo);
}
export function get(full_name) {

    return REPO_CACHE.get(full_name);
}

/**
 * 列表插入
 * @param repos
 */
export function cacheArray(repos) {
    repos.forEach(repo=>cache(repo))
}