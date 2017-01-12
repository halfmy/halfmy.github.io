(function(){
  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;
    var container;
    var particle;
    var camera;
    var scene;
    var renderer;
    var imgscale = 0.7;
    var frame = 18;
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var particles = [];
    var particleImage = new Image();
    particleImage.src = './img/snow.png';


    function onDocumentMouseMove( event ) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart( event ) {
      if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }
    function onDocumentTouchMove( event ) {
      if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
      }
    }


    function loop() {

      renderer.setSize( window.innerWidth, window.innerHeight);

      for(var i = 0; i<particles.length; i++){
          var particle = particles[i];
          particle.updatePhysics();
          with(particle.position){
            if(y<-3000) y+=6000;
            if(x>3000) x-=3000;
            else if(x<-3000) x+=3000;
            if(z>2000) z-=3000;
            else if(z<-3000) z+=3000;
          }
        }
        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.lookAt(scene.position);
        renderer.render( scene, camera );
    }

    /**
    *  id: elements id  canvas 元素id
    *  img: snow img src  雪花图片路径
    * option {
    *     imgscale:0.5,screen:18
    *   }
    */
    window.snow = function(cid,img,opt){
      if(typeof THREE !="object")console.log("Threejs is need!");
      if(img){   particleImage.src = img;}
      if(opt && typeof opt ==="object" && opt["frame"]){frame = parseInt(opt["frame"])||frame;};
      if(opt && typeof opt ==="object" && opt["imgscale"]){imgscale = parseInt(opt["imgscale"])||imgscale;}

      camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
      camera.position.z = 1000;
      scene = new THREE.Scene();
      scene.add(camera);
      container =  document.getElementById(cid);
      renderer = new THREE.CanvasRenderer({"canvas":container});
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
      for (var i = 0; i < SCREEN_WIDTH; i++) {
        particle = new Particle3D( material);
        particle.position.x = Math.random() * 5000 - 2500;
        particle.position.y = Math.random() * 5000 - 2500;
        particle.position.z = Math.random() * 5000 - 2500;
        particle.scale.x = particle.scale.y =  imgscale;
        scene.add( particle );
        particles.push(particle);
      }
      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );
      document.addEventListener( 'touchmove', onDocumentTouchMove, false );
      setInterval( loop, 1000 / frame );
    }
})();
