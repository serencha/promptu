import ReactDOM from "react-dom";
import App from "./App";
import { Box, ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import React, { Component } from "react";

// ReactDOM.render(
// 	<React.StrictMode>
// 		<ChakraProvider>
// 			<ColorModeProvider
// 				options={{
// 					useSystemColorMode: true,
// 				}}
// 			>
// 				<AuthProvider>
// 					<Router>
// 						<App />
// 					</Router>
// 				</AuthProvider>
// 			</ColorModeProvider>
// 		</ChakraProvider>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

// For Testing Purposes Only:
import { AudioBox } from "./components/AudioBox";
const ref = "audio_files/4g.m4a";
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <AudioBox username="hell" link={ref} postId="pp" />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
