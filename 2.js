document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll('.transition-item');
  items.forEach(function (item, index) 
  {
    setTimeout(function () 
    {
      item.classList.add('show');
    }, index * 300); 
  });
});

document.addEventListener("DOMContentLoaded",function()
{
  var heading = document.querySelector('.heading');

  function generateRandomColor()
  {
    var letters = '0123456789ABCDEF'
    var color = '#';
    for(var i = 0; i < 6; i ++)
    {
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  }

  function updateHeadingcolor()
  {
    var randomColor = generateRandomColor();
    heading.style.color = randomColor;
  }

  setInterval(updateHeadingcolor,1000);
});
