
/* 	POSITIONS
	
		toast-top-full-width
		toast-top-left
		toast-top-center
		toast-top-right
		toast-bottom-full-width
		toast-bottom-right
		toast-bottom-center
		toast-bottom-left

	TYPES
		error
		info
		warning
		success

 */


  function Toast(title, type, css, msg, time) {
    this.type = type;
    this.css = css;
    this.msg = msg ;
    this.title = title ;
    this.time=time;

   toastr.options = { "closeButton": true,
					  "debug": false,
					  "newestOnTop": false,
					  "progressBar": true,
					  "preventDuplicates": true,
					  "onclick": null,
					  "showDuration": "30000",
					  "hideDuration": "1000",
					  "extendedTimeOut": "0",
					  "showEasing": "swing",
					  "hideEasing": "linear",
					  "showMethod": "fadeIn",
					  "hideMethod": "fadeOut"
					}
  }
  

  function delayToasts(toasts, delay_time) {    
    var delay = delay_time;
    window.setTimeout(function() {
      showToast(toasts);
    }, delay);

  }

  function showToast(toasts) {
    var t = toasts;
    toastr.options.positionClass = t.css;
    toastr.options.timeOut = t.time;
    toastr[t.type](t.msg, t.title);
  }



  $('#9').click(function() {
    var toasts = new Toast('ererere', 'info', 'toast-top-full-width', 'mensaje', 50000);
    delayToasts(toasts,0);
  });
