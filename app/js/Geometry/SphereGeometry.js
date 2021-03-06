/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeGeometry from './../Scene/ComposeGeometry';
import PlaneGeometry from './PlaneGeometry';

import ValueSlider from 'common/valueSlider';

class SphereGeometry extends ComposeGeometry {
    defaults() {
        return {
            radius: 1,
            uDiv: 50,
            vDiv: 50
        }
    }

    componenetDidMount() {
        this.updateGeometry();
    }

    static createBufferGeometry(
        {radius = 1, uDiv = 50, vDiv = 50}) {

        const geom = PlaneGeometry.createBufferGeometry({uDiv, vDiv, loopIndices: true});
        const pos = geom.attributes.position.array;
        const uvs = geom.attributes.uv.array;
        const pi = Math.PI;

        for (let i = 0, u= 0, v = 1; i < pos.length; i+=3, u += 2, v += 2){
            pos[i] =   radius *   Math.sin((1-uvs[u]) * pi) * Math.cos(uvs[v] * 2*pi);
            pos[i+1] = radius * Math.sin((1-uvs[u]) * pi) * Math.sin(uvs[v] * 2*pi);
            pos[i+2] = radius * Math.cos((1-uvs[u]) * pi);
        }

        geom.computeVertexNormals();

        return geom;
    }

    updateGeometry() {
        this._geometry = SphereGeometry.createBufferGeometry(this.state.toJS());
        this.setDeformerAttributes(this.geometry);
    }

    sliderChange(propName, e, v) {
        this.setState({
            [propName]: v
        })
    }

    renderUI() {

        return (<div>
            <ValueSlider name="Sphere Radius" min={0.1} max={50} value={this.state.get('radius')} onChange={this.sliderChange.bind(this, 'radius')} />
            <ValueSlider name="U Divisions" min={4} max={250} step={1} value={this.state.get('uDiv')} onChange={this.sliderChange.bind(this, 'uDiv')} />
            <ValueSlider name="V Divisions" min={4} max={250} step={1} value={this.state.get('vDiv')} onChange={this.sliderChange.bind(this, 'vDiv')} />
        </div>)
    }
}

SphereGeometry.registerObject('SphereGeometry', SphereGeometry);

export default SphereGeometry;