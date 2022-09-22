//def the width and heigh of svg 
var margin = {top: 25, right: 30, bottom: 35, left: 28},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


//the  x linear  scale which domain is budget and range is width of graph 
var x = d3.scaleLinear()
    .range([10,width]);


//the  y linear  scale which domain is profit and range is height of graph 
var y = d3.scaleLinear()
    .range([height,0]);

//generate 10 color 
var color= d3.schemeCategory10;

// axis y
var xAxis = d3.axisBottom(x);
  

//axis y
var yAxis = d3.axisLeft(y);


//ini svg 
var svg = d3.select("#scatter")
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 

 
//load the data with d3.csv 
//func then deal with promise problem
d3.csv("./assets/data/data.csv").then(data=>{

        //process  the data for d3
        data.forEach(function(d) {
              d.income=+d.income;
              d.obesity=+d.obesity;
              d.id=+d.id;
            });

        // domain of x axis （y）
        //d3.extent[] :
        //   input :array
        //   ouput : [minofarray,maxarray]
        //.nice is to beautify  the array 
        x.domain(d3.extent(data, function(d) { return d.income; })).nice();
        y.domain(d3.extent(data, function(d) { return d.obesity; })).nice();

        

      
          //create the x axis 
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)

          //create the x label 
        svg.append("text")
                // .append("text")
                .attr("class", "label")
                // .attr("x",width )
                .attr("x",width-35)
                .attr("y", height-8)
                .style("font-size","14px")
                .style("text-anchor", "start")
                .text("income($)");
        
          

       //create the y axis 
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

      //create the y label 
        svg.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(0)")
            .attr("x",40)
            .attr("y", -20)
            .attr("dy", ".71em")
            .style("font-size","14px")
            .style("text-anchor", "end")
            .text("obesity(%)")

        //title
        svg.append("text")
           .attr("class","title")
            .attr("x",300)
            .attr("y", 20)
            .style("font-size","20px")
            .text("income VS obesity")


            //create dot of graph 
    let dotgroup=svg
            .selectAll(".dot")
            .data(data)
            .enter()
            .append('g')


        dotgroup
            .append("circle")
            .attr("class", "dot")
            .attr("r",10)
            .attr("cx", function(d) { return x(d.income); })
            .attr("cy", function(d) { return y(d.obesity); })
            .style("fill", function(d) { 
              //def color with movie id
              return color[ d.id%8]; 
            })
            //monitor dot when mouse hover and highlight dot
        
            
          dotgroup 
            .append("text")
            .attr('class','abbr')
            .attr('font-size','10px')
            .attr("x", function(d) { return x(d.income)-5; })
            .attr("y", function(d) { return y(d.obesity)+5; })
            .text(d=>d.abbr)
            .attr('readonly','readonly')
          

          dotgroup
          .on("mouseenter",function(d){
          
              d3.selectAll(".dot").style("opacity",".3")
              d3.select(this).select('.dot').style("opacity","1").attr("r",12);
              

          })
          .on("mouseleave",function(d){

            d3.selectAll(".dot").style("opacity","1").attr("r",10)
            
          });
            
            
         
        

            
         
       
})

     