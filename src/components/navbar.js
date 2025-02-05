import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const pages = [
  { label: "Productos", href: "/productos" },
  { label: "Categorías", href: "/categorias" },
  { label: "pedidos", href: "/ordenesUsuario" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
];

const pagesAdmin = [
  { label: "Productos", href: "/productos" },
  { label: "Categorías", href: "/categorias" },
  { label: "Administrar producto", href: "/productosCrud" },
  { label: "usuarios", href: "/UsuariosAdmin" },
  { label: "pedidos Cliente", href: "/ordenes" },
];

const settings = ["Cuenta", "Pedidos", "Cerrar sesión"];

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [requiredRole, setRequiredRole] = useState(null);

  
  useEffect(() => {
    const role = localStorage.getItem("rol"); 
    setRequiredRole(role); 
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("rol");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TIENDITA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {isAuthenticated ? (
                <>
                  {requiredRole === "Cliente"
                    ? pages.map((page) => (
                        <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                          <Link
                            href={page.href}
                            underline="none"
                            color="inherit"
                          >
                            <Typography>{page.label}</Typography>
                          </Link>
                        </MenuItem>
                      ))
                    : pagesAdmin.map((page) => (
                        <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                          <Link
                            href={page.href}
                            underline="none"
                            color="inherit"
                          >
                            <Typography>{page.label}</Typography>
                          </Link>
                        </MenuItem>
                      ))}
                </>
              ) : (
                pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Link href={page.href} underline="none" color="inherit">
                      <Typography>{page.label}</Typography>
                    </Link>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuthenticated ? (
              <>
                {requiredRole === "Cliente"
                  ? pages.map((page) => (
                      <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                        <Link href={page.href} underline="none" color="inherit">
                          <Typography>{page.label}</Typography>
                        </Link>
                      </MenuItem>
                    ))
                  : pagesAdmin.map((page) => (
                      <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                        <Link href={page.href} underline="none" color="inherit">
                          <Typography>{page.label}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
              </>
            ) : (
              pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link href={page.href} underline="none" color="inherit">
                    <Typography>{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))
            )}
          </Box>

          {!isAuthenticated ? (
            <Box>
              <Button href="/carrito">
                <ShoppingCartIcon sx={{ fontSize: 40, color: "white" }} />
              </Button>
              <Button color="inherit" href="/login">
                Iniciar Sesión
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button href="/carrito">
                <ShoppingCartIcon sx={{ fontSize: 40, color: "white" }} />
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={localStorage.getItem("nombre"+"apellido")} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting === "Cerrar sesión") {
                        handleLogout(); 
                      }
                      handleCloseUserMenu(); 
                    }}
                    href={setting ==="Pedidos" ? "/ordenesUsuario" : "/cuenta"}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
