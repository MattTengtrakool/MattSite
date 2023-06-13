
  $(document).ready(function() {
    $('#tagFilter').select2({
      placeholder: 'Select Tags',
      allowClear: true
    });
  
    document.getElementById('tagFilter').addEventListener('change', function(e) {
        var tagFilter = Array.from(e.target.selectedOptions).map(option => option.value);
        var articles = document.getElementsByClassName('article');
        for (var i = 0; i < articles.length; i++) {
          var tags = articles[i].getElementsByClassName('tags__item');
          var showArticle = false;
          for (var j = 0; j < tags.length; j++) {
            if (tagFilter.includes(tags[j].textContent)) {
              showArticle = true;
              break;
            }
          }
          articles[i].style.display = showArticle ? '' : 'none';
        }
      });
      
      document.getElementById('collapseToggle').addEventListener('change', function(e) {
        var collapse = e.target.checked;
        var years = document.getElementsByClassName('h2');
        for (var i = 0; i < years.length; i++) {
          years[i].nextElementSibling.style.display = collapse ? 'none' : '';
        }
      });
  });
  