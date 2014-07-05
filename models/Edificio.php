<?php
	include("conector.php");
	class  Edificio{

		function __construct() {
	       
	    }

		public function obtenerEdificios($idUsuario){
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
			return $this->objeto;
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
			return $this->objeto;
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
			return $this->objeto;
		}

	}

	$e=new Edificio();
	print_r($e->ObtenerApartamentosdePisosdeunEdificio(1, 1));

?>