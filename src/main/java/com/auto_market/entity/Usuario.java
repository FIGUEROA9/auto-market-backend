package com.auto_market.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, length = 100)
    @NotBlank(message = "El nombre es Obligatorio")
    private String nombre;

    @Email(message = "Ingresar email valido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
    private String tipoUsuario;
    private String telefono;
    private String whatsapp;
    private Boolean verificadoEmail;
    private Boolean verificadoTelefono;


    @ManyToOne
    @JoinColumn(name = "tipo_documento_id", nullable = false)
    @NotNull(message = "Campo obligatorio")
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private TipoDocumento tipoDocumento;

    @NotNull(message = "Campo obligatorio")
    @Past(message = "Ingrese fecha válida")
    private LocalDate fechaExpedicion;

    @NotNull(message = "Campo obligatorio")
    @Past(message = "Ingrese fecha válida")
    private LocalDate fechaNacimiento;



    public Usuario() {
    }

    public Usuario(Long id, String nombre, String email, String password, String tipoUsuario, String telefono, String whatsapp, Boolean verificadoEmail, Boolean verificadoTelefono, TipoDocumento tipoDocumento, LocalDate fechaExpedicion, LocalDate fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
        this.telefono = telefono;
        this.whatsapp = whatsapp;
        this.verificadoEmail = verificadoEmail;
        this.verificadoTelefono = verificadoTelefono;
        this.tipoDocumento = tipoDocumento;
        this.fechaExpedicion = fechaExpedicion;
        this.fechaNacimiento = fechaNacimiento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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


    public String getPassword() {
        return password;
    }

    public void setPassword(String contrasena) {
        this.password = password;
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

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public LocalDate getFechaExpedicion() {
        return fechaExpedicion;
    }

    public void setFechaExpedicion(LocalDate fechaExpedicion) {
        this.fechaExpedicion = fechaExpedicion;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
}