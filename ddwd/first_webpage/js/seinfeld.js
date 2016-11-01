$(document).ready(function () {
    $('#trivia button').on('click', function () {
        $(this).siblings('.answer').removeClass('hide');
        $(this).addClass('hide');
    });

    $('#trivia .answer').on('click', function () {
        $(this).siblings('button').removeClass('hide');
        $(this).addClass('hide');
    })
});
