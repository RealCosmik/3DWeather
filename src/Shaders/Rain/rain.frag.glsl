in vec2 uvInterpolator;
uniform sampler2D u_texture;
void main()
{
    vec2 uv = uvInterpolator;
    vec4 color =texture2D(u_texture,uv);
    gl_FragColor = color*vec4(1,0,0,1);
}