var btnSort = document.getElementById("sort");
var historySorting = [];
var arrayIndex = 0;
var timer;

btnSort.addEventListener("click", function(){
       
    var a = document.getElementById("sorting").value; 	
	var arr = a.split(' ').map(function(item) {
        return parseInt(item, 10);
		});
	arrCount = arr.length;	
	historySorting = [];
	var sortResult = quickSort(arr, 0, arrCount - 1);
	var result = '';
	for (var i = 0; i < sortResult.length; i++) {
		result = result +sortResult[i]+' ';
	}
    var b = document.getElementById("sorted");
	b.value= result;
	   
	timer = setInterval(draw, 150, JSON.parse(JSON.stringify(historySorting)), "canvas");

});


function draw(array, canvasId) {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var width = 660;
        ctx.canvas.width = width;
        var height = 300;
        ctx.canvas.height = height; 

        var min = Math.min.apply(Math, array[arrayIndex]);
        if (min < 0) {
            for (var i = 0; i < array[arrayIndex].length; i++) {
                array[arrayIndex][i] += Math.abs(min) + 1;
            }
            min = Math.min.apply(Math, array[arrayIndex]);
        } else if (min == 0) {
            for (var i = 0; i < array[arrayIndex].length; i++) {
                array[arrayIndex][i]++;
            }
			 min = Math.min.apply(Math, array[arrayIndex]);
        }

     
		var commonWidth=width / array[arrayIndex].length;
		var columnWidth = width / array[arrayIndex].length*0.8;
		var interval= columnWidth*0.1; 


        ctx.canvas.width = columnWidth * array[arrayIndex].length + interval * 2 * array[arrayIndex].length + 1;
		

        var max = Math.max.apply(Math, array[arrayIndex]);
        for (var i = 0, x = interval; i < array[arrayIndex].length; i++, x += columnWidth + interval * 2) {
            var Percents = array[arrayIndex][i] * 100 / max;
            var columnHeightPixels = Math.round(Percents * height / 100);
            ctx.fillStyle='black';
			ctx.fillRect(x, height - columnHeightPixels, columnWidth, columnHeightPixels);
		}
		
        if (arrayIndex < array.length - 1) {
            arrayIndex++;
        } else {
             if (timer != null) {
				clearInterval(timer);
				timer = null;
			}
			arrayIndex = 0;
        }
    }
}



function partition(array, start, end) {
	
	var temp;
	var marker=start;
	for(var i=start; i<=end; i++){
		if(array[i]<array[end]){
			temp=array[marker];
			array[marker]=array[i];
			array[i]=temp;
			historySorting.push(JSON.parse(JSON.stringify(array)));
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



