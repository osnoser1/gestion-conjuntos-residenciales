<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Classcartelera
 *
 * @author hely
 */
/*include("conector.php");*/
	class  Restricciones {
		private static $instance;
		function __construct() {
	       
	    }

        public static function instance() {
	        if (!isset(self::$instance)) {
	            $c = __CLASS__;
	            self::$instance = new $c;
	        }
	        return self::$instance;
   		 }

   		 function SeleccionarEdificio(){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->tupla="SELECT Nombre, idEdificio FROM  edificio";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{				
				$this->objeto[$this->i]['nombre']=$this->db_resultado['Nombre'];
				$this->objeto[$this->i]['idEdificio']=$this->db_resultado['idEdificio'];
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function ObtenerUsuario($idUsuario){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idUsuario=$idUsuario;	
			$this->tupla="SELECT Correo  FROM  usuario  where ID='$this->idUsuario'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;		
			if($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{			
				$this->objeto[0]['email']=$this->db_resultado['Correo'];			
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function ObtenerPisosdeunEdificio($idEdificio){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idEdificio=$idEdificio;
			$this->tupla="SELECT * FROM  apartamento where  idEdificio='$this->idEdificio'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{				
				$this->objeto[$this->i]['id']=$this->db_resultado['idApartamento'];
				$this->objeto[$this->i]['idPiso']=$this->db_resultado['Piso'];
				$this->objeto[$this->i]['idEdificio']=$this->db_resultado['idEdificio'];
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function ObtenerApartamentosdePisosdeunEdificio($idPiso, $idEdificio){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->idPiso=$idPiso;
			$this->idEdificio=$idEdificio;
			$this->tupla="SELECT  apartamento.idApartamento, apartamento.idUsuario, apartamento.Nombre  FROM  apartamento INNER JOIN usuario ON apartamento.idUsuario=usuario.ID where  apartamento.idEdificio='$this->idEdificio' and apartamento.Piso='$this->idPiso'";
			$this->resultado = $this->mysqli->query($this->tupla);
			$this->objeto[0]['m']=$this->resultado->num_rows;	
			$this->i=0;
			while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
			{				
				$this->objeto[$this->i]['idapartamento']=$this->db_resultado['idApartamento'];
				$this->objeto[$this->i]['idUsuario']=$this->db_resultado['idUsuario'];
				$this->objeto[$this->i]['Nombre']=$this->db_resultado['Nombre'];					
				$this->i++;	
			}		
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function obtenercorreosdeunedificio($edificios){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->edificio=$edificios;
			$this->tupla="";		
			$this->t=0;
			$this->j=1;		
			for ($this->i=0; $this->i<sizeof($this->edificio); $this->i++) { 
				$this->id=$this->edificio[$this->i];
				$this->tupla="SELECT DISTINCT usuario.Correo FROM apartamento INNER JOIN  apartamento_usuario ON apartamento.idApartamento=apartamento_usuario.idapartamento  INNER JOIN  usuario ON apartamento_usuario.idusuario=usuario.ID WHERE   apartamento.idEdificio='$this->id'";
				$this->resultado = $this->mysqli->query($this->tupla);			
				while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
				{			
					$this->objeto[$this->j]=$this->db_resultado['Correo'];
					$this->j++;	
				}	
			}
			$this->objeto[0]=$this->j;
			$this->objeto=array_unique($this->objeto);
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function obtenercorreosdeunPiso($idEdificio, $idPiso){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->edificio=$idEdificio;
			$this->piso=$idPiso;
			$this->tupla="";		
			$this->t=0;
			$this->j=1;	
			for ($this->i=0; $this->i<sizeof($this->piso); $this->i++) { 
				$this->idpiso=$this->piso[$this->i];
				$this->tupla="SELECT DISTINCT usuario.Correo FROM apartamento INNER JOIN  apartamento_usuario ON apartamento.idApartamento=apartamento_usuario.idapartamento  INNER JOIN  usuario ON apartamento_usuario.idusuario=usuario.ID WHERE   apartamento.idEdificio='$this->edificio' AND apartamento.Piso='$this->idpiso'";
				$this->resultado = $this->mysqli->query($this->tupla);			
				while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
				{			
					$this->objeto[$this->j]=$this->db_resultado['Correo'];
					$this->j++;	
				}	
			}
			$this->objeto[0]=$this->j;
			$this->objeto=array_unique($this->objeto);
			$this->mysqli->close();
			return json_encode($this->objeto);
		}

		public function obtenercorreosdeunApartamento($idEdificio, $idPiso, $idApartamento){
			$this->mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$this->edificio=$idEdificio;
			$this->piso=$idPiso;
			$this->apartamentos=$idApartamento;
			$this->tupla="";		
			$this->t=0;
			$this->j=1;	
			for ($this->i=0; $this->i<sizeof($this->apartamentos); $this->i++) { 
				$this->idapartamentos=$this->apartamentos[$this->i];
				$this->tupla="SELECT DISTINCT usuario.Correo FROM apartamento INNER JOIN  apartamento_usuario ON apartamento.idApartamento=apartamento_usuario.idapartamento  INNER JOIN  usuario ON apartamento_usuario.idusuario=usuario.ID WHERE   apartamento.idEdificio='$this->edificio' AND apartamento.Piso='$this->piso' AND apartamento.idApartamento='$this->idapartamentos' ";
				$this->resultado = $this->mysqli->query($this->tupla);			
				while($this->db_resultado = mysqli_fetch_array($this->resultado, MYSQLI_ASSOC))
				{			
					$this->objeto[$this->j]=$this->db_resultado['Correo'];
					$this->j++;	
				}	
			}
			$this->objeto[0]=$this->j;
			$this->objeto=array_unique($this->objeto);
			$this->mysqli->close();
			echo json_encode($this->objeto);
		}
	}

	/*$e=new Edificio();
	print_r($e->obtenercorreosdeunedificio("{1}"));*/

?>