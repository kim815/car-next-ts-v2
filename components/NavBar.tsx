import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem
  } from "carbon-components-react";
function NavBar(){

  return(
    <Header aria-label="IBM Platform Name">
    <HeaderName href="#" prefix="IBM">
      [Platform]
    </HeaderName>
    <HeaderNavigation aria-label="IBM [Platform]">
      {/* <HeaderMenuItem href="/">Home</HeaderMenuItem> */}
      <HeaderMenu>
        <HeaderMenuItem href="/">Home</HeaderMenuItem>
      </HeaderMenu>
      </HeaderNavigation>
      </Header>)
}
export default NavBar;