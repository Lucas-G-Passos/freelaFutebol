import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FilialInsert() {
    const [filialData, setFilialData] = useState({id_endereco: '', nome: ''});
    const [enderecoData, setEnderecoData] = useState({ rua: '', numero: '', cidade: '', estado: '', cep: '' });
    const [message, setMessage] = useState('');
} 