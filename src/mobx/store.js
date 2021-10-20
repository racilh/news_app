import {action, autorun, computed, makeObservable, observable} from "mobx";


class BookmarkStore {

    _theme = true
    _bookmarks = []
    _history = []

    /**
     * Class constructor to keep track of
     * the values of the observables : {@link _bookmark},{@link _history} ,{@link _theme}
     * the returned values of the computed functions : {@link bookmarks},{@link history},{@link theme}
     * the modifications of the states of our observables using action : {@link bookmarkExists}, {@link historyExists},
     * {@link addHistory}, {@link removeBookmark},{@link addBookmark},{@link changeTheme}
     * when changes occur using {@link makeObservable}
     */
    constructor() {
        makeObservable(this, {
            _bookmarks: observable,
            _history: observable,
            _theme: observable,
            bookmarks: computed,
            history: computed,
            theme: computed,
            bookmarkExists: action,
            historyExists: action,
            addHistory: action,
            removeBookmark: action,
            addBookmark: action,
            changeTheme: action,

        });
        autorun(() => {
            console.log(this.bookmarks);
            console.log(this.history);
            console.log(this.theme);
        });

    }

    /**
     * @return {[]} of {@link bookmarks}
     */
    get bookmarks() {
        return this._bookmarks;
    }

    /**
     * @return {[]} of {@link history}
     */
    get history() {
        return this._history;
    }

    /**
     * @return {boolean} value of {@link theme}
     */
    get theme() {
        return this._theme;
    }

    /**
     * Function to check if an article is already bookmarked
     * @param item
     * @return {boolean}
     */
    bookmarkExists(item) {
        return  this._bookmarks.filter(bookmark => bookmark.url === item.url).length > 0
    }
    /**
     * Function to check if an article is already in History
     * @param item
     * @return {boolean}
     */
    historyExists(item) {
        return this._history.filter(history => history.url === item.url).length > 0
    }

    /**
     * Function to add an article to bookmark, and remove it if its already exists in bookmark
     * @param item
     */
    addBookmark(item) {
        if (this.bookmarkExists(item)) {
            this.removeBookmark(item)
        } else {
            this._bookmarks.push(item);
            console.log(this._bookmarks)
        }

    }
    /**
     * Function to add an article to {@link _history}, and display log in console if its already exists
     * @param item
     */
    addHistory(item) {
        if (this.historyExists(item)) {
            console.log("Already Exists")
        } else {
            this._history.push(item);
            console.log(this._history)
        }
    }
    /**
     * Function to remove an article from bookmark
     * @param item
     */
    removeBookmark(item) {
        console.log("HERE Delete WORKING")
        this.isBookmarked = false;
        this._bookmarks = this._bookmarks.filter(bookmark => bookmark.url !== item.url)
        console.log(this._bookmarks)
    }

    /**
     * Function that changes the state of the theme
     */
    changeTheme() {
        this._theme = !this._theme

    }


}
/**
 * Let the module expose its assets to other modules using export
 */
export const bookmarkStore = new BookmarkStore();