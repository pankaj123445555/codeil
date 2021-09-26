const menubar = document.getElementById('menu-icon');
console.log(menubar);
  const menucontent = document.getElementsByClassName('menubar-content-768px');
  const delbtn = document.getElementsByClassName('delete-icon');
  menubar.addEventListener('click',function()
  {
    console.log('pankaj');
    if(menucontent[0].getAttribute('data-val')=="false")
    {
       menucontent[0].style.display = 'block'
       menucontent[0].setAttribute("data-val","true");
    }
    else
    {
      menucontent[0].style.display = 'none'
       menucontent[0].setAttribute("data-val","false");
    }
      
  });
  delbtn[0].addEventListener('click',function(event){

    console.log('giri');
    // if(menucontent[0].getAttribute('data-val')=="false")
    // {
    //    return;
    // }
    event.stopPropagation();
    if(menucontent[0].getAttribute('data-val')=="true")
    {
      menucontent[0].style.display = 'none';
       menucontent[0].setAttribute("data-val","false");
    }

  });