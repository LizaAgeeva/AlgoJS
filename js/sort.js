var btnSort = document.getElementById('sort');

btnSort.addEventListener("click", function(){
    var a = document.getElementById("sorting").value;  
	var arr = a.split(' ').map(function(item) {
        return parseInt(item, 10);
		});
	var sortResult = quickSort(arr, 0, arr.length - 1);
	var result = '';
	for (var i = 0; i < sortResult.length; i++) {
		result = result +sortResult[i]+' ';
	}
    var b = document.getElementById("sorted");
	b.value= result;

});
function partition(array, start, end) {
	
	var temp;
	var marker=start;
	for(var i=start; i<=end; i++){
		if(array[i]<array[end]){
			temp=array[marker];
			array[marker]=array[i];
			array[i]=temp;
			marker=marker+1;
		}
		
	}
	temp = array[marker];
	array[marker]=array[end];
	array[end]=temp;
	return marker;
 
}
function quickSort(array, start, end){
 var index;
    if (array.length > 1) {
        index = partition(array, start, end);
        if (start < index - 1) {
            quickSort(array, start, index - 1);
        }
        if (index < end) {
            quickSort(array, index, end);
        }
    }
    return array;
}

