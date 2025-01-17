var React = require('react');
var CanvasJS = require('./canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;
import _uniqueId from 'lodash/uniqueId';

class CanvasJSChart extends React.Component {
	constructor(props) {		
		super(props);	
		this.options = props.options ? props.options : {};		
		this.containerProps = props.containerProps ? props.containerProps : {width: "100%", position: "relative"};
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
		this.chartContainerId =  _uniqueId("canvasjs-react-chart-container-")
	}	
	componentDidMount() {
		//Create Chart and Render		
		this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
		this.chart.render();
		
		if(this.props.onRef)
			this.props.onRef(this.chart);
	}	
    shouldComponentUpdate(nextProps, nextState){
		//Check if Chart-options has changed and determine if component has to be updated
        return !(nextProps.options === this.options);
    }
	componentDidUpdate() {
		//Update Chart Options & Render
		this.chart.options = this.props.options;
		this.chart.render();
	}
	componentWillUnmount() {
		//Destroy chart and remove reference
		this.chart.destroy();
		if(this.props.onRef)
			this.props.onRef(undefined);
	}		
	render() {		
		return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });		
		
	}	
}

export {CanvasJSChart, CanvasJS};