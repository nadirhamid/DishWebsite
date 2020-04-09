jQuery(document).ready(function(){
  jQuery("#register").click(function(){
    jQuery(".register").toggle();
    jQuery(".login").toggle();

  })
  jQuery("#login").click(function(){
    jQuery(".login").toggle();
    jQuery(".register").toggle();

  })
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

  function getUrlParam(parameter, defaultvalue){
      var urlparameter = defaultvalue;
      if(window.location.href.indexOf(parameter) > -1){
          urlparameter = getUrlVars()[parameter];
          }
      return urlparameter;
  }


  var param = getUrlParam('attempt_login','');

  if(param != ''){
    $('#registerModal').modal('show')
    jQuery("#login").click()
  }

  var param = getUrlParam('attempt_register','');
  if(param != ''){
    $('#registerModal').modal('show')
    jQuery("#register").click()
  }

})
