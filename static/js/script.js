$(document).ready(() => {
    $('#form_send_msg').on('submit', (e) => {
        e.preventDefault();
    });

    const socket = io.connect('http://127.0.0.1:5000');
    const username = $('#username').text();
    var now = new Date();

    socket.on('connect', () => {
        socket.send({'username': 'Чат', 'msg': 'участник ' + username + ' присоеденился ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()});

    });
    $('#send_msg').on('click', () => {
        socket.send({
                'msg': $('#message_input').val(),
                'username': username
            });
        $('#message_input').val('');
        $('html,body').animate({scrollTop: document.body.scrollHeight},"fast");
    });

    socket.on('message', data => {
        if (data.msg.length > 0) {
            if (data.username === 'Service message') {
                $('#messages').append(`<p><strong>${data.username}:</strong> ${data.msg}</p>`);
            } else {
                $('#messages').append(`<p><strong>${data.username}:</strong> ${data.msg}</p>`);
            }
        }
    });

    $(function() {
      $('.scrollUp').click(function() {
        $("html, body").animate({
          scrollTop:0
        },500);
      })
    })
    $(window).scroll(function() {
      if ($(this).scrollTop()>0) {
        $('.scrollUp').fadeIn();
      }
      else {
        $('.scrollUp').fadeOut();
      }
    });

    $(function(){
        $('#scrollDown').click(function(){
            $('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 500);
            return false;
        });
    });

    var btn = document.getElementById("theme-button");
    var link = document.getElementById("theme-link");

    btn.addEventListener("click", function () { ChangeTheme(); });

    function ChangeTheme()
    {
        let lightTheme = "{{url_for( 'static', filename='css/light.css', v=1 )}}";
        let darkTheme = "{{url_for( 'static', filename='css/dark.css', v=1 )}}";

        var currTheme = link.getAttribute("href");
        var theme = "";

        if(currTheme == lightTheme)
        {
         currTheme = darkTheme;
         theme = "dark";
        }
        else
        {
         currTheme = lightTheme;
         theme = "light";
        }

        link.setAttribute("href", currTheme);

    }

    $('#something').click(function() {
        location.reload();
    });

});