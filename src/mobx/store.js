import {action, computed, makeObservable, observable} from "mobx";

class BookmarkStore {

    _theme = false

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

    }

    _bookmarks = []

    get bookmarks() {
        return this._bookmarks;
    }

    _history = []

    get history() {
        return this._history;
    }

    get theme() {
        return this._theme;
    }

    bookmarkExists(item) {
        return this._bookmarks.filter(bookmark => bookmark.url === item.url).length > 0
    }

    historyExists(item) {
        return this._history.filter(history => history.url === item.url).length > 0
    }


    addBookmark(item) {
        if (this.bookmarkExists(item)) {
            this.removeBookmark(item)
        } else {
            this._bookmarks.push(item);
            console.log(this._bookmarks)
        }

    }

    addHistory(item) {
        if (this.historyExists(item)) {
            console.log("Already Exists")
        } else {
            this._history.push(item);
            console.log(this._history)
        }
    }

    removeBookmark(item) {
        console.log("HERE Delete WORKING")
        this.isBookmarked = false;
        this._bookmarks = this._bookmarks.filter(bookmark => bookmark.url !== item.url)
        console.log(this._bookmarks)
    }

    changeTheme() {
        this._theme = !this._theme

    }


}

export const bookmarkStore = new BookmarkStore();