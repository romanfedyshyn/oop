(function () {
    "use strict";

    var addUser = function (user, template, table) {
        var $row = $(template).clone();
        $row.removeClass('templateRow');
        $row.attr('data-id', user.id);

        $row.find('td.name').text(user.name);
        $row.find('td.sex').text(user.sex);
        $row.find('td.birthday').text(user.birthday);
        $row.find('td.address').text(user.address);
        $row.find('td.phone').text(user.phone);
        $row.find('td.email').text(user.email);

        table.append($row);
    };

    function inherit(Child, Parent) {
        var F = function () {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.super = Parent.prototype;
    }

    var SuperUser = function () {};

    SuperUser.prototype.visible = true;
    SuperUser.prototype.changeDataVisibility = function () {
        this.visible = !this.visible;
    };

    SuperUser.prototype.isDataVisible = function () {
        return this.visible;
    };

    var User = function () {
        this.id = null;
        this.name = null;
        this.sex = null;
        this.birthday = null;
        this.address = null;
        this.phone = null;
        this.email = null;
    };

    inherit(User, SuperUser);

    var users = [];
    var templateRow;
    var tableBody;
    //Add required attribute for each input element and create table element
    $(document).ready(function () {

        templateRow = window.test = $('.templateRow')[0];
        tableBody = $("#user-table tbody");

        //Event for submit on a form. Create new user, add him to array and into the table
        $("#user-form").submit(function (e) {
            e.preventDefault();

            var user = new User();
            user.name = $("input[name='name']").val();
            user.sex = $("input[name='sex']").val();
            user.birthday = $("input[name='birthday']").val();
            user.address = $("input[name='address']").val();
            user.phone = $("input[name='phone']").val();
            user.email = $("input[name='email']").val();
            users.push(user);
            var index = users.indexOf(user);
            user.id = index;

            addUser(user, templateRow, tableBody);
            $("#user-form :not(input[type=submit])").val("");
        });

        $('#user-table tbody').on('click', 'tr', (function () {
            var me = $(this);
            var clickedRowColumnsExceptName = me.find(':not(td[class=name])');

            $('#user-table tbody tr').each(function (index) {
                var currentUser = users[$(this).data('id')];
                if (currentUser === undefined) {
                    return;
                }

                if ($(this).data('id') !== me.data('id')) {
                    if (currentUser.isDataVisible() === true) {
                        $(this).hide();
                        clickedRowColumnsExceptName.hide();
                    } else {
                        $(this).show();
                        clickedRowColumnsExceptName.show();
                    }
                    currentUser.changeDataVisibility();
                }
            });
        }));
    });
})();