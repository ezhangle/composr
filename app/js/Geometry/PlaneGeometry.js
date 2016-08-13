import ComposeGeometry from './ComposeGeometry';
import ValueSlider from 'common/valueSlider';

class PlaneGeometry extends ComposeGeometry {
    constructor(options) {
        options = PlaneGeometry.setDefaults(options,{
            width: 10,
            length: 10,
            loopIndices: false
        });

        super(options);

        this.updateGeometry();
    }

    static createBufferGeometry(
        {width = 10, length = 10, loopIndices = false}) {
        const geom = new THREE.BufferGeometry();

        var vertices = [];
        var uvs = [];
        var indices = [];
        var width1 = width + 1, length1 = length + 1;

        for (var i=0; i < width1; i++){
            for (var j=0; j < length1; j++){
                vertices.push ( i / width, 0, j / length);
                uvs.push(i / width, j / length);
            }
        }

        for (var i=0; i < width; i++){
            for (var j=0; j < length; j++){

                // face vertices
                var a = i * length1 + j;
                var b = i * length1 + j + 1;
                var c = (i+1) * length1 + j;
                var d = (i+1) * length1 + j + 1;

                // face indices
                indices.push(a, c, b);
                indices.push(b, c, d);

            }
        }

        // connects both ends of the plane so convex shapes mapping can be used.
        if (loopIndices) {
            for (var i=0; i < width; i++){
                const j = length - 1;

                // face vertices
                var a = i * length1 + j;
                var b = i * length1 ;
                var c = (i+1) * length1 + j;
                var d = (i+1) * length1 ;

                // face indices
                indices.push(a, c, b);
                indices.push(b, c, d);

            }
        }

        var positions = new Float32Array(vertices);
        var uv = new Float32Array(uvs);
        var index = new Uint32Array(indices);

        geom.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geom.addAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );
        geom.setIndex(new THREE.BufferAttribute( index, 1 ) );

        geom.computeVertexNormals();

        return geom;
    }

    static get name() {
        return 'Plane'
    }

    updateGeometry() {
        this._geometry = PlaneGeometry.createBufferGeometry(this.state.toJS());
        this.setDeformerAttributes(this.geometry);
    }

    sliderChange(propName, e, v) {
        this.setState({
            [propName]: v
        })
    }

    renderUI() {

        return (<div>
            <ValueSlider name="Length" min={4} max={250} step={1} value={this.state.get('width')} onChange={this.sliderChange.bind(this, 'width')} />
            <ValueSlider name="Width" min={4} max={250} step={1} value={this.state.get('length')} onChange={this.sliderChange.bind(this, 'length')} />
        </div>)
    }
}


export default PlaneGeometry