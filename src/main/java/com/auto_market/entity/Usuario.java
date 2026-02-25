package com.auto_market.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String email;
    private String contrasena;
    private String tipoUsuario;
    private String telefono;
    private String whatsapp;
    private Boolean verificadoEmail;
    private Boolean verificadoTelefono;


    public Usuario() {
    }

    public Usuario(Integer id, String nombre, String email, String contrasena, String tipoUsuario, String telefono, String whatsapp, Boolean verificadoEmail, Boolean verificadoTelefono) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.tipoUsuario = tipoUsuario;
        this.telefono = telefono;
        this.whatsapp = whatsapp;
        this.verificadoEmail = verificadoEmail;
        this.verificadoTelefono = verificadoTelefono;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }


    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }


    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }


    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }


    public Boolean getVerificadoEmail() {
        return verificadoEmail;
    }

    public void setVerificadoEmail(Boolean verificadoEmail) {
        this.verificadoEmail = verificadoEmail;
    }


    public Boolean getVerificadoTelefono() {
        return verificadoTelefono;
    }

    public void setVerificadoTelefono(Boolean verificadoTelefono) {
        this.verificadoTelefono = verificadoTelefono;
    }

}