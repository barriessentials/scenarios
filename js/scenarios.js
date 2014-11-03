jQuery(function() {
    var $ = jQuery;

    $('.open-modal').on('click touchend', function() {
        event.preventDefault();
        $(this).modal({fadeDuration:100,clickClose:true});

        if ($(this).hasClass('correct')) {
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });

    /* Allow navigating directly to a slide using: <a class="goto" data-slide="4">Go to Slide 4</a> */
    $('.goto').on('click touchend', function() {
        event.preventDefault();
        var slide = parseInt($(this).data('slide'));
        Dz.setSlide(slide);
    });

    /* Dynamically scale the font size of modal content based on the number of letters in the modal text */
//    $('.modal').each(function () {
//        var ln = $(this).text().length,
//            startSize = 36,
//            size = startSize - (ln/100*2);
//
//        $(this).css('font-size', Math.round(size))
//    });

    $('#hipaa-auth-7').on('click touchend', function() {
        if ($(this).is(':checked')) {
            $('#s5-signature-info-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('.checkbox-list.require-all-checked td').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            modal = section.find('.modal.all-checked');

        section.children('.button').toggleClass('hide', !allChecked);

        if (allChecked && modal) {
            modal.modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('.obtain-records').on('click touchend', function () {
        var id = $(this).attr('id');
        var allChecked = $('.obtain-records').length == $('.obtain-records:checked').length;

        $(this).parents('section').children('.button').toggleClass('hide', !allChecked);

        if ($(this).is(':checked')) {
            $('#' + id + '-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('#dir-info-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            c4checked = section.find('#dir-info-4').is(':checked'),
            c5checked = section.find('#dir-info-5').is(':checked'),
            numChecked = section.find('.dir-info:checked').length,
            correctAnswersChecked = c4checked && c5checked && numChecked === 2;

        var modalId = correctAnswersChecked
            ? '#dir-info-correct-modal'
            : (c4checked || c5checked) && numChecked === 1
                ? '#dir-info-partially-correct-modal'
                : '#dir-info-incorrect-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !correctAnswersChecked);
    });

    $('#signed-auth-1').on('click touchend', function() {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
            $('#s10-incorrect').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    $('#signed-auth-2').on('click touchend', function() {
        if ($(this).is(':checked')) {
            Dz.setSlide(11);
        }
    });

    $('.hospital-response').on('click touchend', function() {
        var id = $(this).attr('id'),
            bestAnswerChecked = id === 'hospital-response-4';

        $(this).parents('section').children('.button').toggleClass('hide', !bestAnswerChecked);

        if ($(this).is(':checked')) {
            $('#' + id + '-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }

        if (!bestAnswerChecked) {
            $(this).prop('checked', false);
        }
    });

    $('ul.reveal li, ul.reveal-list li').on('click touchend', function () {
        $(this).addClass('show');

        var allClicked = $(this).parent().children('li').length === $(this).parent().children('li.show').length,
            section = $(this).parents('section'),
            shouldShowNextButton = !$(this).parent().hasClass('no-next');

        if (shouldShowNextButton) {
            $(this).parents('section').children('.button').toggleClass('hide', !allClicked);
        }
    });

    $('ul.person-list li').on('click touchend', function () {
        $(this).addClass('show-pic');
        $(this).children('img').removeClass('hide');

        var allClicked = $(this).parent().children('li').length === $(this).parent().children('li.show-pic').length,
            section = $(this).parents('section');

        if (allClicked) {
            $(this).parents('section').find('#show-caseworker').removeClass('hide');
            $(this).parent().children('li.fade').css({opacity: 0.5});
        }

        $(this).parents('section').children('.button').toggleClass('hide', !allClicked);
    });

    $('.fill-in-the-blank').change(function() {
        var id = $(this).val(),
            section = $(this).parents('section'),
            allCorrectChoicesSelected = !(section.find('select>option:selected').filter(function () { return $(this).val() !== 'correct'; }).length > 0),
            sectionId = section.attr('id'),
            hasModal = section.find('.modal'),
            allAnswersProvided = section.find('select>option:selected').filter(function () { return $(this).val() === ''; }).length === 0,
            correctHtml = '<div class="correct answer">Correct!</div>',
            incorrectHtml = '<div class="incorrect answer">Incorrect, please try again</div>';

        section.children('.button').toggleClass('hide', !allCorrectChoicesSelected);

        section.children('.answer').remove();

        if (allAnswersProvided) {
            var html = allCorrectChoicesSelected ? correctHtml : incorrectHtml;
            section.append(html);
        }

        if (allCorrectChoicesSelected && hasModal) {
            $('#' + sectionId + '-' + id + '-modal').modal({fadeDuration: 100, closeText: 'OK'});
        }
    });

    var recoupLeft, recoupTop;
    $('.drag-me').draggable({ revert: 'invalid' });

    $('#s5-caseworker').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 60);
            $(ui.draggable).css('left', $(this).position().left - 30);
            $('#s5-a').modal('open');
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });
    $('#s5-file-cabinet').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('bottom', $(this).position().bottom + 10);
            $(ui.draggable).css('left', $(this).position().left + 10);
            $('#s5-b').modal('open');
        }
    });

    $('#s9-rtf').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 140);
            $(ui.draggable).css('left', $(this).position().left + 120);
            $('#s9-a').modal('open');
        }
    });

    $('#s9-table').droppable({
        activeClass: 'droppable-active',
        accept: '.drag-me',
        drop: function (event, ui) {
            $(ui.draggable).css('top', $(this).position().top + 20);
            $(ui.draggable).css('left', $(this).position().left + 80);
            $('#s9-b').modal('open');
            $(this).parents('section').children('.button').removeClass('hide');
        }
    });

    $('.unhide').click(function(e) {
        e.preventDefault();

        var section = $(this).parents('section');

        section.find('.hide').show(500);
        $(this).unbind('click');
    });

    $('a.inc').on('click touchend', function(e) {
        e.preventDefault();

        var inc = $(this).attr('href').replace('#', '.'),
            section = $(this).parents('section'),
            lastInc = section.find('a.inc').last(),
            isLast = lastInc.attr('href') == $(this).attr('href');

        section.find(inc).show(500);

        $(this).hide();
        $(this).parents('section').children('.button').toggleClass('hide', !isLast);
    });

    $('#release-info-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            numChecked = section.find('.release-info:checked').length;

        var modalId = allChecked
            ? '#release-info-correct-modal'
            : numChecked == 0
                ? '#release-info-incorrect-modal'
                : '#release-info-partially-correct-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !allChecked);
    });

    $('#release-ed-rec-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            numChecked = section.find('.release-ed-rec:checked').length;

        var modalId = allChecked
            ? '#release-ed-rec-correct-modal'
            : numChecked == 0
                ? '#release-ed-rec-incorrect-modal'
                : '#release-ed-rec-partially-correct-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !allChecked);
    });

    $('#release-ed-rec2-submit').on('click touchend', function () {
        var section = $(this).parents('section'),
            allChecked = section.find('input[type="checkbox"]').length == section.find('input[type="checkbox"]:checked').length,
            numChecked = section.find('.release-ed-rec2:checked').length;

        var modalId = allChecked
            ? '#release-ed-rec2-correct-modal'
            : numChecked == 0
            ? '#release-ed-rec2-incorrect-modal'
            : '#release-ed-rec2-partially-correct-modal';

        $(modalId).modal({fadeDuration: 100, closeText: 'OK'});

        section.children('.button').toggleClass('hide', !allChecked);
    });

    $('.show-click-text').on('click touchend', function() {
        var section = $(this).parents('section'),
            id = $(this).data('id'),
            clickTextDivs = section.find('.click-text div'),
            images = section.find('li img');

        images.css({ opacity: 0.5 });
        $(this).css({ opacity: 1.0 });
        clickTextDivs.hide();
        $('#' + id).show();
    });
});
