(function($){
	$(document).ready(function() {
		var fullUrl = window.location.href.split("/");
		if(fullUrl[fullUrl.length-1]=='wf_states'){
			$(".form-item--get-wf-states").hide();
			$(".form-item--man-fields").hide();
			$('#edit-get-wf-states').empty();
			$('#edit-man-fields').empty();
		}
		
		
		
		$('#edit-get-wf-name').change(function() {
			var fullUrl = window.location.href.split("/");
			var endpoint_url = fullUrl[0]+"//"+fullUrl[2]+"/admin/config/wfstates";
			var ct_name = $("#edit-get-wf-name").val();
			$.ajax({
				url: endpoint_url, 
				type: 'GET',
				success: function(response) {
					var w_list = JSON.parse(JSON.stringify(response));
					var w_states = w_list['CT'][ct_name];
					$('#edit-get-wf-states').empty();
					var op_val = 0;
					$.each(w_states, function(key, value) { 
						if(op_val==0){
							$('#edit-get-wf-states').append($('<option></option>').attr('value', "0").text("Select the State")); 
						}
						op_val = op_val+1;
						$('#edit-get-wf-states').append($('<option></option>').attr('value', key).text(value)); 
					});
					$(".form-item--get-wf-states").show();
				},
				error: function(xhr, status, error) {
					console.log('Error:', error);
				}
			});
			
			var endpoint_url = fullUrl[0]+"//"+fullUrl[2]+"/admin/config/ctfields";
			$.ajax({
				url: endpoint_url, 
				type: 'POST',
				data: {ct: ct_name},
				success: function(response) {
					var f_list = JSON.parse(JSON.stringify(response));
					$('#edit-man-fields').empty();
					var op_val = 0;
					$.each(f_list, function(key, value) { 
						if(op_val==0){
							$('#edit-man-fields').append($('<option></option>').attr('value', "0").text("Choose the Fields")); 
						}
						op_val = op_val+1;
						$('#edit-man-fields').append($('<option></option>').attr('value', key).text(value)); 
					});
					$(".form-item--man-fields").show();
					
				},
				error: function(xhr, status, error) {
					console.log('Error:', error);
				}
			});
			
			
		});
	});
})(jQuery);


