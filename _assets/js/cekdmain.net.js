$(document).ready(function () {
  var myTimer = 100;
  var delayTime = 1500;
  var TldArray = ['id', 'web.id', 'my.id', 'co.id', 'or.id', 'ac.id', 'sch.id', 'com', 'net', 'info', 'org', 'biz', 'name', 'co', 'in', 'us'];
  $(document).on('keyup', '.Search', function (e) {
    if (
      (e.which >= 1 && e.which <= 4) ||
      (e.which >= 48 && e.which <= 57) ||
      (e.which >= 65 && e.which <= 90) ||
      (e.which >= 97 && e.which <= 105) ||
      e.which == 45 ||
      e.which == 190 ||
      e.which == 13 ||
      e.which == 8 ||
      e.which == 189 ||
      e.which == 109 ||
      e.which == 111 ||
      e.which == 191
    ) {
      var domain = search_validate($('#Search').val());
      var domain_length = domain.length;
      var the_char = domain.charAt(0);
      if (the_char === ' ' || domain.match(/^([-.@#$%^&*()=":';?></|!])/) || domain == '' || domain_length == 1) {
        $('#main_page').visible();
        $('#social-button').visible();
        $('.footer').removeClass('footer-hidden');
        $('#tld_list').invisible();
        $('#top-header-domain').invisible();
        $('#links').invisible();
      } else {
        $('#main_page').invisible();
        $('#social-button').invisible();
        $('.footer').addClass('footer-hidden');
        $('#tld_list').visible();
        $('#top-header-domain').visible();
        $('#links').visible();
        $('.suggesstions-list').css('height', $('.search-tld').css('height'));
        $('.btn-dmn').css({ 'background-color': '#C2C7CD' });
        $('.com-btn').css({ 'background-color': '#C2C7CD' });
        $('.btn-dmn').html('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
        $('.com-btn').html('<div class="spinner main-tld-loader"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
        $('#change-background').removeClass('main-tld-cont available').addClass('main-tld-cont is-loading');
        $('#change-background').removeClass('main-tld-cont not-available').addClass('main-tld-cont is-loading');
        $('.btn-dmn,.com-btn').attr('id', 'default');
        $('.InstantDomainShow').html(domain);
        var TotalDivWidth = $('.domain-name').width();
        var DomainWidth = $('.InstantDomainShow').width();
        var ExtWidth = $('.domain-ext').width();
        var ExtractWidth = TotalDivWidth - DomainWidth;
        if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
        else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': 'none' });
        var start = domain.indexOf('.');
        if (start != -1) {
          var FirstPart = domain.substr(0, start);
          var FindExtension = domain.substr(start + 1, domain_length);
        } else {
          var FirstPart = domain;
          var FindExtension = '';
        }
        domain = FirstPart;
        if (jQuery.inArray(FindExtension, TldArray) != '-1') {
          main_tld = FindExtension;
          $('.live-domain-name').html(domain + '.' + main_tld);
        } else {
          var main_tld = 'com';
          $('.live-domain-name').html(domain + '.' + main_tld);
        }
        clearTimeout(myTimer);
        myTimer = window.setTimeout(function () {
          domain = domain.substring(0, 60);
          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/suggest.php',
            data: { domain: domain },
            success: function (msg) {
              $('.suggesstions-list').css({ height: '100%' });
              $('.suggesstions-list').html(msg);
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: main_tld, tld1: 'main_div' },
            dataType: 'json',
            success: function (msg) {
              $('#top-header-domain').html(msg[0]);
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_id').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'web.id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_webid').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'my.id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_myid').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'co.id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_coid').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'or.id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_orid').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'ac.id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_acid').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'sch.id' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_schid').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'com' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_com').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'net' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_net').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'info' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_info').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'org' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_org').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'biz' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_biz').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'name' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_name').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'co' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_co').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'in' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_in').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });

          $.ajax({
            type: 'POST',
            url: 'https://www.cekdomain.net/results.php',
            data: { domain: domain, tld: 'us' },
            dataType: 'json',
            success: function (msg) {
              $('#tab_us').html(msg[0]);
              if (ExtractWidth < ExtWidth) $('.domain-ext').css({ position: 'absolute', right: '0', top: '13px', 'background-color': '#DFE4E8' });
              else $('.domain-ext').css({ position: 'relative', padding: '0', top: '0', 'background-color': '#DFE4E8' });
            },
          });
        }, delayTime);
      }
    }
  });
});
