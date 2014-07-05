<?php
	include("conector.php");
	class Mensaje {
		function __construct() {
	       
	    }
	    public function enviarmensaje($titulo, $mensaje, $para){
			session_start();    
			date_default_timezone_set('America/Caracas');
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->para=explode(",", $para);
			$this->titulo=$titulo;
			$this->mensaje=$mensaje;
			$this->fecha=date("Y-m-d H:i:s");
			$this->correo=$_SESSION["Correo"];
			for($this->i=0; $this->i<sizeof($this->para); $this->i++){
			$this->usuario=$this->para[$this->i];
			if(strlen($this->usuario)>4){
				$this->tupla="INSERT INTO mensaje (para, asunto, descripcion, fecha, leido, de) VALUES ('$this->usuario', '$this->titulo', '$this->mensaje', '$this->fecha', 'false', '$this->correo')";
				$this->resultado = $this->mysqli->query($this->tupla);
				$this->tupla2="INSERT INTO mensajesenviados (para, asunto, descripcion, fecha, de) VALUES ('$this->usuario', '$this->titulo', '$this->mensaje', '$this->fecha', '$this->correo')";
				$this->resultado2 = $this->mysqli->query($this->tupla2);
			}
			}
			$this->mysqli->close();
			echo json_encode("true");
	    }

	    public function obtenermensaje(){
	    	session_start();
			$this->correo=$_SESSION["Correo"];         
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idUsuario= $_SESSION["ID"];		
			$this->tamaño=5;
			$this->tupla1="SELECT Count(*) as cantidad FROM mensaje WHERE para='$this->correo'";
			$this->resultado = $this->mysqli->query($this->tupla1);
			$this->cantidadderegistro="";
			if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
				$this->cantidadderegistro=$this->db_resultado['cantidad'];
			}		
			$this->paginas=(int)($this->cantidadderegistro/$this->tamaño);					
			$this->tupla="SELECT *, usuario.ID FROM mensaje INNER JOIN  usuario on mensaje.para=usuario.Correo WHERE usuario.ID='$this->idUsuario'  ORDER BY idMensaje DESC limit $this->tamaño";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;
			$this->objeto[0]['paginas']=$this->paginas;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{			
				$this->objeto[$this->i]['asunto']=$this->db_resultado['asunto'];
				$this->objeto[$this->i]['descripcion']=$this->db_resultado['descripcion'];	
				$this->objeto[$this->i]['idMensaje']=$this->db_resultado['idMensaje'];
				$this->objeto[$this->i]['fecha']=$this->db_resultado['fecha'];
				$this->date= new DateTime($this->objeto[$this->i]['fecha']);
				$this->objeto[$this->i]['fecha']=$this->date->format('d-m-y H:i:s');
				$this->objeto[$this->i]['leido']=$this->db_resultado['leido'];
				$this->objeto[$this->i]['de']=$this->db_resultado['de'];

				$this->i++;	
			}		
			$this->mysqli->close();
			return $this->objeto;
	    }

	    public function leermensaje($idMensaje){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idMensaje=$idMensaje;
			$this->tupla="SELECT * FROM mensaje WHERE idMensaje='$this->idMensaje'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;			
			if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{			
				$this->objeto[0]['asunto']=$this->db_resultado['asunto'];
				$this->objeto[0]['descripcion']=$this->db_resultado['descripcion'];	
				$this->objeto[0]['idMensaje']=$this->db_resultado['idMensaje'];
				$this->objeto[0]['fecha']=$this->db_resultado['fecha'];
				$this->date= new DateTime($this->objeto[0]['fecha']);
				$this->objeto[0]['fecha']=$this->date->format('d-m-y H:i:s');	
				$this->objeto[0]['de']=$this->db_resultado['de'];	

			}		
			$this->tupla="UPDATE mensaje SET leido='1' WHERE idMensaje='$this->idMensaje'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->mysqli->close();
			return $this->objeto;
	    }

	    public function borrarMensaje($idMensaje){
				$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
				$this->idMensaje=$idMensaje;
				$this->tupla="DELETE FROM mensaje WHERE idMensaje='$this->idMensaje'";
				$this->resultado = $this->mysqli->query($this->tupla);
				$this->tamaño=5;
				$this->tupla1="SELECT Count(*) as cantidad FROM mensaje";
				$this->resultado = $this->mysqli->query($this->tupla1);
				$this->cantidadderegistro="";
				if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC)){
					$this->cantidadderegistro=$this->db_resultado['cantidad'];
				}		
				$this->paginas=(int)($this->cantidadderegistro/$this->tamaño);		
				$this->objeto[0]['paginas']=$this->paginas;	
				$this->mysqli->close();
				return $this->objeto;
		}
		public function marcarnoleido($idMensaje){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idMensaje=$idMensaje;
			$this->tupla="UPDATE mensaje SET leido='0' WHERE idMensaje='$idMensaje'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->mysqli->close();
			echo json_encode("true");
		}

			
	}

	$m=new  Mensaje();
	print_r($m->marcarnoleido(58));

?>