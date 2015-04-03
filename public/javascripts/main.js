/**
 * Created by Mitchell Taylor on 1/26/2015.
 */
$(function(){
    refresh();
    $('#submit').click(function(){
        $.post('/api/item', {'item':$('#item-post').val(), 'keyword':$('#desc-post').val()}, function(data){
            if (data.success){
                refresh();
            } else
                alert('error');
        })
    });
    $('#generate').click(function(){
        var items = $( "#items-sortable" ).sortable('toArray', {attribute: 'value'});
        var params = {
            'items': items,
            'hiring_manager':$('#hiring_manager').val(),
            'job_title':$('#job_title').val(),
            'source':$('#source').val(),
            'company':$('#company').val()
        };
        $.post('/api/gen',  {'data':JSON.stringify(params)}, function(data){
                alert(data.success);
        })
//        $.ajax({
//            type: 'POST',
//            data: JSON.stringify(params),
//            contentType: 'application/json',
//            url: '/api/gen'
//        });
    })
});
function refresh(){
    $('#items').html('');
    $.getJSON('/api/item', function(data){
        if (data.success){
            data.items.forEach(function(item){
                $('#items').append('<div class="keyword" id="'+item.id+'" desc="'+item.item+'">' + item.keyword + '</div>');
            });
        }
        $('.keyword').click(function(){
            $(this).toggleClass('sel');
            if ($(this).hasClass('sel')){
                $('#items-sortable').append('<li id="item-'+$(this).id+'" value="'+$(this).attr('desc') + '">'+$(this).attr('desc') + '</li>');
                $( "#items-sortable" ).sortable();
            }else{
                $('#item-'+$(this).id).remove();
            }
        });
        $('.keyword').hover(function(){
            $('#transparency').stop().fadeIn();
            $('#desc').html($(this).attr('desc'));
        }, function(){
            $('#transparency').stop().fadeOut('fast');
        })
    });
}
