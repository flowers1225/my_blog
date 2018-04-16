try {
let vs = 'attribute vec3 position;\nuniform vec2 resolution;\n\nvoid main () {\n    vec3 pos = position;\n\n    gl_Position = vec4(pos, 1.0);\n}';

let fs =  '// Found this on GLSL sandbox. I really liked it, changed a few things and made it tileable.\n// :)\n// by David Hoskins.\n// @https://www.shadertoy.com/view/4sXfDj\n\nprecision highp float;\n\nuniform vec2 resolution;\n\nuniform float u_time;\n\n//#define SHOW_TILING\n\n#define TAU 6.28318530718\n#define MAX_ITER 5\n\nvoid main()\n{\n    float time = u_time * .5+23.0;\n    // uv should be the 0-1 uv of texture...\n    vec2 uv = (gl_FragCoord.xy / resolution.xy);\n\n#ifdef SHOW_TILING\n    vec2 p = mod(uv*TAU*2.0, TAU)-250.0;\n#else\n    vec2 p = mod(uv*TAU, TAU)-250.0;\n#endif\n    vec2 i = vec2(p);\n    float c = 1.0;\n    float inten = .005;\n\n    for (int n = 0; n < MAX_ITER; n++)\n    {\n        float t = time * (1.0 - (3.5 / float(n+1)));\n        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));\n        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));\n    }\n    c /= float(MAX_ITER);\n    c = 1.17-pow(c, 1.4);\n    vec3 colour = vec3(pow(abs(c), 8.0));\n    colour = mix(vec3(1.0), vec3(0.901, 0.905, 0.899), colour.x);\n\n    #ifdef SHOW_TILING\n    // Flash tile borders...\n    vec2 pixel = 2.0 / resolution.xy;\n    uv *= 2.0;\n\n    float f = floor(mod(u_time*.5, 2.0)); \t// Flash value.\n    vec2 first = step(pixel, uv) * f;\t\t   \t// Rule out first screen pixels and flash.\n    uv  = step(fract(uv), pixel);\t\t\t\t// Add one line of pixels per tile.\n    colour = mix(colour, vec3(1.0, 1.0, 0.0), (uv.x + uv.y) * first.x * first.y); // Yellow line\n\n    #endif\n    gl_FragColor = vec4(colour, 1.0);\n}';

class WebGiel {

    constructor (canvas, fragment, vertex) {
        this.canvas = canvas;
        this.gl = this.initWebgl();

        this.fragment = this.createShader(this.gl.FRAGMENT_SHADER, fragment);
        this.vertex =  this.createShader(this.gl.VERTEX_SHADER, vertex);
        
        this.program = this.createProgram(this.fragment, this.vertex);
        // this.startTime = performance.now();
        this.startTime =new Date().getTime();

        this.uniforms = {};

        this.attributes = {};

        this.type = {
            t: 'uniform1i',
            f: 'uniform1f',
            v2: 'uniform2fv',
            v3: 'uniform3fv',
            v4: 'uniform4fv',
            m2: 'uniformMatrix2fv',
            m3: 'uniformMatrix3fv',
            m4: 'uniformMatrix4fv'
        };

        this.init();

        this.resize();

        this.render = this.render.bind(this);
    }

    initWebgl () {
        let gl = null;

        gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

        if (!gl) {
            console.error('Failed to get the rendering context for WebGL');
            
            return null
        }

        return gl;
    }

    init () {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        var vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), this.gl.STATIC_DRAW);

        var a_position = this.gl.getAttribLocation(this.program, 'position');
        this.gl.vertexAttribPointer(a_position, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_position);
    }

    createProgram (fragment, vertex) {
        var program = this.gl.createProgram();

        this.gl.attachShader(program, fragment);
        this.gl.attachShader(program, vertex);

        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {

            console.error(this.getProgramInfoLog(program));

            this.gl.deleteProgram(program);

            this.gl.deleteShader(fragment);

            this.gl.deleteShader(vertex);

            return null;
        }

        this.gl.useProgram(program);

        return program;
    }

    createShader (type, textContent) {
        let shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, textContent);

        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));

            this.gl.deleteShade(shader);

            return null;
        }

        return shader;
    }

    render () {
        // requestAnimationFrame(this.render);

        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_time'), (new Date().getTime() - this.startTime) / 1000);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    resize () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl.viewport(0, 0, this.width, this.height);

        this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'resolution'), this.width, this.height);
    }

    addUniform (name, type) {
        // let uniform = this.uniforms[name];
        // uniform = this.uniforms[name] = {};
        // uniform.location = this.gl.getUniformLocation(this.program, name);
        // uniform.type = this.uniforms[type];
    }

}


let init = function () {

    let canvas = document.createElement('canvas');
    canvas.className = 'webgl';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    let bodyEl = document.querySelector('body')
    bodyEl.insertBefore(canvas, bodyEl.firstChild);    
    let webgl = new WebGiel(
        canvas,
        fs,
        vs
    );

    let render = function () {

        requestAnimationFrame(render);

        webgl.render();
    };

    render();

}

init ();

} catch(e) {
    console.log(e);
}