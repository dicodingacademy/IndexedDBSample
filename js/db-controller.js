const idbPromised = idb.open('books_database', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('books')) {
        upgradedDb.createObjectStore("books", {keyPath: "bookId"});
    }
});

const dbGetAllBook = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("books", `readonly`);
            return transaction.objectStore("books").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const dbInsertBook = book => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("books", `readwrite`);
            transaction.objectStore("books").add(book);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteBook = bookId => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("books", `readwrite`);
            transaction.objectStore("books").delete(bookId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};