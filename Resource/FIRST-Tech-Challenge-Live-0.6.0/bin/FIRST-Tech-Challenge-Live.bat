@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  FIRST-Tech-Challenge-Live startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and FIRST_TECH_CHALLENGE_LIVE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args
if "%@eval[2+2]" == "4" goto 4NT_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*
goto execute

:4NT_args
@rem Get arguments from the 4NT Shell from JP Software
set CMD_LINE_ARGS=%$

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\FIRST-Tech-Challenge-Live-0.6.0.jar;%APP_HOME%\lib\resources;%APP_HOME%\lib\MatchMaker;%APP_HOME%\lib\spark-core-2.7.1.jar;%APP_HOME%\lib\spark-debug-tools-0.5.jar;%APP_HOME%\lib\spark-template-velocity-2.3.jar;%APP_HOME%\lib\slf4j-simple-1.7.13.jar;%APP_HOME%\lib\sqlite-jdbc-3.7.2.jar;%APP_HOME%\lib\lombok-1.16.6.jar;%APP_HOME%\lib\jbcrypt-0.4.jar;%APP_HOME%\lib\gson-2.7.jar;%APP_HOME%\lib\httpclient-4.5.4.jar;%APP_HOME%\lib\commons-math3-3.0.jar;%APP_HOME%\lib\commons-cli-1.4.jar;%APP_HOME%\lib\spark-pac4j-2.2.0.jar;%APP_HOME%\lib\guava-23.5-jre.jar;%APP_HOME%\lib\poi-3.9.jar;%APP_HOME%\lib\poi-ooxml-3.9.jar;%APP_HOME%\lib\pac4j-http-2.2.1.jar;%APP_HOME%\lib\jetty-server-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-webapp-9.4.6.v20170531.jar;%APP_HOME%\lib\websocket-server-9.4.6.v20170531.jar;%APP_HOME%\lib\websocket-servlet-9.4.6.v20170531.jar;%APP_HOME%\lib\velocity-1.7.jar;%APP_HOME%\lib\httpcore-4.4.7.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\commons-codec-1.10.jar;%APP_HOME%\lib\pac4j-core-2.2.1.jar;%APP_HOME%\lib\jsr305-1.3.9.jar;%APP_HOME%\lib\checker-qual-2.0.0.jar;%APP_HOME%\lib\error_prone_annotations-2.0.18.jar;%APP_HOME%\lib\j2objc-annotations-1.1.jar;%APP_HOME%\lib\animal-sniffer-annotations-1.14.jar;%APP_HOME%\lib\poi-ooxml-schemas-3.9.jar;%APP_HOME%\lib\dom4j-1.6.1.jar;%APP_HOME%\lib\jackson-databind-2.8.7.jar;%APP_HOME%\lib\commons-collections-3.2.1.jar;%APP_HOME%\lib\commons-lang-2.4.jar;%APP_HOME%\lib\xmlbeans-2.3.0.jar;%APP_HOME%\lib\xml-apis-1.0.b2.jar;%APP_HOME%\lib\jackson-annotations-2.8.0.jar;%APP_HOME%\lib\jackson-core-2.8.7.jar;%APP_HOME%\lib\stax-api-1.0.1.jar;%APP_HOME%\lib\javax.servlet-api-3.1.0.jar;%APP_HOME%\lib\jetty-http-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-io-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-xml-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-servlet-9.4.6.v20170531.jar;%APP_HOME%\lib\websocket-common-9.4.6.v20170531.jar;%APP_HOME%\lib\websocket-client-9.4.6.v20170531.jar;%APP_HOME%\lib\websocket-api-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-util-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-security-9.4.6.v20170531.jar;%APP_HOME%\lib\jetty-client-9.4.6.v20170531.jar;%APP_HOME%\lib\slf4j-api-1.7.25.jar

@rem Execute FIRST-Tech-Challenge-Live
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %FIRST_TECH_CHALLENGE_LIVE_OPTS%  -classpath "%CLASSPATH%" org.usfirst.ftc.server.Server %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable FIRST_TECH_CHALLENGE_LIVE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%FIRST_TECH_CHALLENGE_LIVE_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
