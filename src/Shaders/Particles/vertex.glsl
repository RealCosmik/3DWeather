attribute vec3 scale;
 void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    projectedPosition*=vec4(scale,1);
     gl_Position = projectedPosition;
    /**
     * Size
     */
    gl_PointSize = 5.0;
}