$(document).ready(function () {
    // List Book Form Submission
    $('#listBookForm').submit(function (event) {
        event.preventDefault();

        var title = $('#title').val();
        var author = $('#author').val();
        var genre = $('#genre').val();
        var condition = $('#condition').val();

        // Send POST request to server to list the book
        $.ajax({
            url: '/books/list',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                title: title,
                author: author,
                genre: genre,
                condition: condition
            }),
            success: function (response) {
                // Display success message or update UI accordingly
                console.log(response);
            },
            error: function (error) {
                // Display error message or handle error accordingly
                console.log(error);
            }
        });
    });

    // Search Book Form Submission
    $('#searchBookForm').submit(function (event) {
        event.preventDefault();

        var keyword = $('#searchKeyword').val();

        // Send GET request to server to search for books
        $.ajax({
            url: '/books/search',
            type: 'GET',
            dataType: 'json',
            data: {
                keyword: keyword
            },
            success: function (response) {
                // Update UI with search results
                displaySearchResults(response);
            },
            error: function (error) {
                // Display error message or handle error accordingly
                console.log(error);
            }
        });
    });

    // Rate Book Form Submission
    $('#rateBookForm').submit(function (event) {
        event.preventDefault();

        var bookId = $('#bookId').val();
        var rating = $('#rating').val();
        var review = $('#review').val();

        // Send POST request to server to rate the book
        $.ajax({
            url: '/ratings-reviews/rate',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                bookId: bookId,
                rating: rating,
                review: review
            }),
            success: function (response) {
                // Display success message or update UI accordingly
                console.log(response);
            },
            error: function (error) {
                // Display error message or handle error accordingly
                console.log(error);
            }
        });
    });

    // Add Book Form Submission (Admin Panel)
    $('#addBookForm').submit(function (event) {
        event.preventDefault();

        var title = $('#newBookTitle').val();
        var author = $('#newBookAuthor').val();
        var genre = $('#newBookGenre').val();
        var condition = $('#newBookCondition').val();

        // Send POST request to server to add a new book
        $.ajax({
            url: '/admin/add-book',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                title: title,
                author: author,
                genre: genre,
                condition: condition
            }),
            success: function (response) {
                // Display success message or update UI accordingly
                console.log(response);
            },
            error: function (error) {
                // Display error message or handle error accordingly
                console.log(error);
            }
        });
    });

    // Mock Data (Replace with API calls)
    var availableBooks = [
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', condition: 'Condition 1' },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', condition: 'Condition 2' },
        { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Genre 3', condition: 'Condition 3' }
    ];

    var userBooks = [
        { id: 4, title: 'Book 4', author: 'Author 4', genre: 'Genre 4', condition: 'Condition 4' },
        { id: 5, title: 'Book 5', author: 'Author 5', genre: 'Genre 5', condition: 'Condition 5' }
    ];

    var userReviews = [
        { bookId: 1, rating: 4, review: 'Good book' },
        { bookId: 2, rating: 3, review: 'Average book' }
    ];

    var allBooks = [
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Genre 1', condition: 'Condition 1' },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Genre 2', condition: 'Condition 2' },
        { id: 3, title: 'Book 3', author: 'Author 3', genre: 'Genre 3', condition: 'Condition 3' },
        { id: 4, title: 'Book 4', author: 'Author 4', genre: 'Genre 4', condition: 'Condition 4' },
        { id: 5, title: 'Book 5', author: 'Author 5', genre: 'Genre 5', condition: 'Condition 5' }
    ];

    // Display Available Books
    var availableBooksList = $('#availableBooksList');
    for (var i = 0; i < availableBooks.length; i++) {
        var book = availableBooks[i];
        availableBooksList.append('<li>' + book.title + ' by ' + book.author + '</li>');
    }

    // Display User's Books
    var userBooksList = $('#userBooksList');
    for (var i = 0; i < userBooks.length; i++) {
        var book = userBooks[i];
        userBooksList.append('<li>' + book.title + ' by ' + book.author + '</li>');
    }

    // Display User's Reviews
    var userReviewsList = $('#userReviewsList');
    for (var i = 0; i < userReviews.length; i++) {
        var review = userReviews[i];
        userReviewsList.append('<li>Book ID: ' + review.bookId + ', Rating: ' + review.rating + ', Review: ' + review.review + '</li>');
    }

    // Display All Books
    var allBooksList = $('#allBooksList');
    for (var i = 0; i < allBooks.length; i++) {
        var book = allBooks[i];
        allBooksList.append('<li>' + book.title + ' by ' + book.author + '</li>');
    }
});

function displaySearchResults(results) {
    var searchResultsContainer = $('.search-results');
    searchResultsContainer.empty();

    if (results.length === 0) {
        searchResultsContainer.append('<p>No results found.</p>');
    } else {
        var list = $('<ul></ul>');

        for (var i = 0; i < results.length; i++) {
            var book = results[i];
            var listItem = $('<li>' + book.title + ' by ' + book.author + '</li>');
            list.append(listItem);
        }

        searchResultsContainer.append(list);
    }
}
