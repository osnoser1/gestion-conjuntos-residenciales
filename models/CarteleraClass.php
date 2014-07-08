<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CarteleraClass
 *
 * @author hely
 */
class CarteleraClass {
    //put your code here
    function __construct() {
        
    }
    public function IngresarporApartamento($apartamentos,$titulo,$contenido){
	session_start();
        date_default_timezone_set('America/Caracas');
        $this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->apartamentos=serialize($apartamentos);
	$this->nombre=$_SESSION["Nombre"];
        $this->apellido=$_SESSION["Apellido"];
	$this->fecha=date("Y-m-d H:i:s");
        $this->titulo=$titulo;
        $this->contenido=$contenido;
	$this->salida="todo esta bien";
	$this->tupla="INSERT INTO `post` (`contenido`, `titulo`, `fecha`, `usuario`, `Apellido`, `aptos`)  VALUES ('$this->contenido', '$this->titulo', '$this->fecha', '$this->nombre', '$this->apellido', '$this->apartamentos')";
	$this->resultado = $this->mysqli->query($this->tupla) or $this->salida=$this->mysqli->error;
	$this->mysqli->close();
	return json_encode($this->salida);	
    }/*titulo lo cambie antes decia para*/
    public function IngresarPorpiso($edificios,$piso,$titulo,$contenido){
	session_start();
        date_default_timezone_set('America/Caracas');	
	$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->objeto=array();
	$this->tupla="";
        $this->titulo=$titulo;
        $this->contenido=$contenido;
        $this->piso=$piso;
        $this->edificio=$edificios;
	$this->t=0;
	$this->j=1;	
	for ($this->i=0; $this->i<sizeof($this->piso); $this->i++) { 
		$this->idpiso=$this->piso[$this->i];
		$this->tupla="SELECT idApartamento FROM apartamento where Piso='$this->idpiso' and idEdificio='$this->edificio'";
		$this->resultado=$this->mysqli->query($this->tupla);
		if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){			
			$this->objeto[$this->j]=$this->db_resultado['idApartamento'];
			$this->j++;	
		}	
	} 
	$this->objeto=serialize($this->objeto);
	$this->nombre=$_SESSION["Nombre"];
        $this->apellido=$_SESSION["Apellido"];
	$this->fecha=date("Y-m-d H:i:s");
	$this->salida="todo esta bien";
	$this->tupla="INSERT INTO `post` (`contenido`, `titulo`, `fecha`, `usuario`, `Apellido`, `aptos`)  VALUES ('$this->contenido', '$this->titulo',  '$this->fecha', '$this->nombre', '$this->apellido', '$this->objeto')";
	$this->resultado = $this->mysqli->query($this->tupla) or $this->salida=$this->mysqli->error;
	$this->mysqli->close();
	return json_encode($this->salida);
        
    }
    public function IngresarPorEdificio($idEdificio,$titulo,$contenido){
	session_start();
	$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->objeto=array();
	$this->tupla="";
	$this->t=0;
	$this->j=0;
        $this->edificio=$idEdificio;
        $this->titulo=$titulo;
        $this->contenido=$contenido;
	for ($this->i=0; $this->i<sizeof($this->edificio); $this->i++) { 
            $this->id=$this->edificio[$this->i];
            $this->tupla="SELECT idApartamento FROM apartamento where idEdificio=$this->id";
            $this->resultado = $this->mysqli->query($this->tupla);
            while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){			
		$this->objeto[$this->j]=$this->db_resultado['idApartamento'];
		$this->j++;	
            }	
	} 
	$this->objeto=serialize($this->objeto);
	$this->nombre=$_SESSION["Nombre"];
        $this->apellido=$_SESSION["Apellido"];
	$this->fecha=date("Y-m-d H:i:s");
	$this->salida="todo esta bien";
	$this->tupla="INSERT INTO `post` (`contenido`, `titulo`, `fecha`, `usuario`, `Apellido`, `aptos`)  VALUES ('$this->contenido', '$this->titulo', '$this->fecha', '$this->nombre', '$this->apellido', '$this->objeto')";
        $this->resultado = $this->mysqli->query($this->tupla) or $this->salida=$this->mysqli->error;
	$this->mysqli->close();
	return json_encode($this->salida);
    }
    public function publicaciones(){
	$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->tamaño=5;
	$this->tupla1="SELECT Count(*) as cantidad FROM post";
	$this->resultado = $this->mysqli->query($this->tupla1);
	$this->cantidadderegistro="";
	if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
            $this->cantidadderegistro=$this->db_resultado['cantidad'];
	}
	$this->paginas=(int)($this->cantidadderegistro/$this->tamaño);
	$this->tupla="SELECT * FROM post  order by idpost desc limit $this->tamaño" ;
	$this->resultado = $this->mysqli->query($this->tupla);
	$this->objeto[0]['m']=$this->resultado->num_rows;
	$this->objeto[0]['paginas']=$this->paginas;	
	$this->i=0;
	while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
            $this->objeto[$this->i]['titulo']=$this->db_resultado['titulo'];
            $this->objeto[$this->i]['contenido']=$this->db_resultado['contenido'];	
            $this->objeto[$this->i]['idpost']=$this->db_resultado['idpost'];
            $this->objeto[$this->i]['fecha']=$this->db_resultado['fecha'];
            $this->objeto[$this->i]['usuario']=$this->db_resultado['usuario'];
            $this->objeto[$this->i]['Apellido']=$this->db_resultado['Apellido'];
            $this->i++;	
	}		
	$this->mysqli->close();
	return json_encode($this->objeto);
    }
    public function borrarPublicacion($idpost){
        $this->idpost=$idpost;
        $this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->tupla="DELETE  FROM post WHERE  idpost='$this->idpost'";
	$this->resultado = $this->mysqli->query($this->tupla);
        $this->mysqli->close();
	return json_encode("true");
    }
   public function siguientepagina($pagina){
	$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->pagina=$pagina;
	$this->tamaño=5;
	$this->desde=$this->pagina*$this->tamaño;
        $this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->tupla1="SELECT Count(*) as cantidad FROM post";
	$this->resultado =$this->mysqli->query($this->tupla1);
	$this->cantidadderegistro="";
	if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
            $this->cantidadderegistro=$this->db_resultado['cantidad'];
        }
        $this->paginas=(int)($this->cantidadderegistro/$this->tamaño);		
	$this->tupla="SELECT * FROM post order by idpost desc LIMIT $this->desde,$this->tamaño";
	$this->resultado = $this->mysqli->query($this->tupla);
	$this->objeto[0]['m']=$this->resultado->num_rows;
	$this->objeto[0]['paginas']=$this->paginas;	
	$this->objeto[0]['paginaactual']=$this->pagina;
	$this->i=0;
	while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
            $this->objeto[$this->i]['titulo']=$this->db_resultado['titulo'];
            $this->objeto[$this->i]['contenido']=$this->db_resultado['contenido'];	
            $this->objeto[$this->i]['idpost']=$this->db_resultado['idpost'];
            $this->objeto[$this->i]['fecha']=$this->db_resultado['fecha'];
            $this->objeto[$this->i]['usuario']=$this->db_resultado['usuario'];
            $this->objeto[$this->i]['Apellido']=$this->db_resultado['Apellido'];
            $this->i++;	
	}		
        $this->mysqli->close();
	return json_encode($this->objeto);
    }
        
   public function restringirPublicacion(){
	session_start();
	$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
	$this->tamaño=5;
	$this->tupla1="SELECT Count(*) as cantidad FROM post";
	$this->usuario=$_SESSION["ID"];
	$this->resultado = $this->mysqli->query($this->tupla1);
	$this->cantidadderegistro="";
	if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
            $this->cantidadderegistro=$this->db_resultado['cantidad'];
	}
	$paginas=(int)($this->cantidadderegistro/$this->tamaño);
	$this->tupla="SELECT * FROM post  order by idpost desc limit $this->tamaño" ;
	$this->resultado = $this->mysqli->query($this->tupla);
	//$this->objeto[0]['paginas']=$this->paginas;	
	$this->tupla2="SELECT idapartamento FROM apartamento_usuario WHERE idusuario=$this->usuario";
	$this->resultado2 = $this->mysqli->query($this->tupla2);
	$this->idApartamento="";
	if($this->db_resultado = mysqli_fetch_array($this->resultado2, MYSQLI_ASSOC)){		
            $this->idApartamento=$this->db_resultado['idapartamento'];	
	}	
        $this->tupla="SELECT * FROM post order by idpost desc";
	$this->resultado = $this->mysqli->query($this->tupla);
	$this->i=0;
	while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
            $this->apartamentos=unserialize($this->db_resultado['aptos']);
            for ($this->x=1; $this->x <sizeof($this->apartamentos); $this->x++) {
		if($this->idApartamento==$this->apartamentos[$this->x]){
                    $this->objeto[$this->i]['titulo']=$this->db_resultado['titulo'];
                    $this->objeto[$this->i]['contenido']=$this->db_resultado['contenido'];	
                    $this->objeto[$this->i]['idpost']=$this->db_resultado['idpost'];
                    $this->objeto[$this->i]['fecha']=$this->db_resultado['fecha'];
                    $this->objeto[$this->i]['usuario']=$this->db_resultado['usuario'];
                    $this->objeto[$this->i]['Apellido']=$this->db_resultado['Apellido'];
                    $this->i++;							
		}
            }	
	}	
	$this->objeto[0]['m']=$this->i;	
	$this->mysqli->close();
	return json_encode($this->objeto);
    }
}
?>