  function hideElement(element) {
	    element.style.display = 'none';
        }

	function showElement(element, style) {
	    var displayStyle = style ? style : 'block';
	    element.style.display = displayStyle;
	}
	
	function clearLoginError() {
	    document.querySelector('#login-error').innerHTML = '';
	}

        function clearRegisterResult() {
	    document.querySelector('#register-result').innerHTML = '';
	}

       function showLoginError(){
	console.log('there is an error');
}

         function showLoadingMessage(msg) {
	    var itemList = document.querySelector('#item-list');
	    itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
	      msg + '</p>';
	  }


          /**
	   * AJAX helper
	   * @param method - GET|POST|PUT|DELETE
	   * @param url - API end point
	   * @param data - request payload data
	   * @param successCallback - Successful callback function
	   * @param errorCallback - Error callback function
	   */
	  function ajax(method, url, data, successCallback, errorCallback) {
	    var xhr = new XMLHttpRequest();

	    xhr.open(method, url, true);

	    xhr.onload = function() {
	      if (xhr.status === 200) {
	        successCallback(xhr.responseText);
	      } else {
	        errorCallback();
	      }
	    };

	    xhr.onerror = function() {
	      console.error("The request couldn't be completed.");
	      errorCallback();
	    };

	    if (data === null) {
	      xhr.send();
	    } else {
	      xhr.setRequestHeader("Content-Type",
	        "application/json;charset=utf-8");
	      xhr.send(data);
	    }
	  }
