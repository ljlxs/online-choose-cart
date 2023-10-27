import  * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 导入模型加载器方法
import { loadManager } from "../model/loadManager"

// 导入汽车类方法
import { Car } from "../model/Car"

// 创建场景、摄像机、渲染器、轨道控制器、全局变量
let scene,camera,renderer,controls
//灯光的位置
let dirPosList

const app=document.querySelector(".app")
function init(){
    //创建场景
    scene=new THREE.Scene()
    //创建摄像机
    camera=new THREE.PerspectiveCamera(75,app.clientWidth/app.clientHeight,0.1,1000)
    camera.position.z=5
    //渲染器
    renderer=new THREE.WebGLRenderer({
        //抗锯齿
        antialias: true
    })
    // 渲染器画布大小
    renderer.setSize(app.clientWidth,app.clientHeight)

    //渲染器阴影贴图
    renderer.shadowMap.enabled=true
    app.appendChild(renderer.domElement)
    // 加载模型
    loadManager("glb/scene.gltf", (gltf) => {
        // 获取到模型对象
        const model = gltf.scene
        // 将模型对象加载到场景中
        const car = new Car(model, scene)
        car.init()
    })
}
//灯光添加
function createLight(){
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
}
//坐标轴
function  createHelper(){
    const axesHelper=new THREE.AxesHelper(5)
    scene.add(axesHelper)
}
// 轨道控制器
function createControls(){
    controls=new OrbitControls(camera,renderer.domElement)
}
// 场景适配
function resizeRender () {
    window.addEventListener("resize",()=>{
        renderer.setSize(app.clientWidth,app.clientHeight)
        camera.aspect=app.clientWidth / app.clientHeight
        camera.updateProjectionMatrix()
    })
}

function renderLoop(){
    renderer.render(scene,camera)
    controls.update()
    requestAnimationFrame(renderLoop)
}
function cart(){
    init()
    createControls()
    createHelper()
    resizeRender()
    renderLoop()
    createLight()
}
cart()