var textInputElement = document.getElementById('textInput');
var resultDivElement = document.getElementById('resultDiv');
var inputheaderdivElement = document.getElementById('inputheaderDiv')


textInputElement.addEventListener('keypress', function (e) {
    var textInputValue = textInputElement.value;
    var textInputForGet = textInputValue.replace(" ", "%20");
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        $.get(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts%7Cinfo&generator=search&formatversion=2&exsentences=1&exintro=1&explaintext=1&inprop=url&gsrsearch=${textInputForGet}&gsrwhat=text`, function( data ) {
            var resultArray = data.query.pages    
            
            
            renderResult(resultArray);
            
            console.log(resultArray);
            console.log(textInputForGet)
              });
    }
});


  function renderResult(array){
var result = ``;

if (!array) {result=`Sorry, no results found`}
   
else {for(var i=0; i<array.length; i++){

result += `<div class="col align-self-center resultunit">
<a class="anchor" href="${array[i].canonicalurl}">
<h5>${array[i].title}</h5> <br>
${array[i].extract}
</a>
</div>`
    }}

    resultDivElement.innerHTML = result;

  }

  function clearSearch(){
    resultDivElement.innerHTML = '';
  }


  // Search Bar
  function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
            inputheaderdivElement.innerHTML = '';
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
            clearSearch();
            inputheaderdivElement.innerHTML = 'Press icon to open Search';
        }
}











// https://en.wikipedia.org/?curid= +page ID numeris