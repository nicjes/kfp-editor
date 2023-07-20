from pathlib import Path
import kfp

#Create a folder to store the created files if it does not exist
Path('out').mkdir(exist_ok=True)

#Check the current KFP version based on the first character of the version number
version = int(kfp.__version__[0])

#Create an example component that prints a text
@kfp.dsl.component
def printer(text: str) -> str:
    print(text)
    return text

#Differentiate between v1 and v2
if version < 2:
    #v1: Save the component in a variable by calling a special function
    printer_op = kfp.components.create_component_from_func(printer, output_component_file='out/v1_component.yaml')
else:
    #v2: Call the general DSL compiler
    kfp.compiler.Compiler().compile(printer, package_path='out/v2_component.yaml')

#Create a pipeline that uses the previously created component
@kfp.dsl.pipeline()
def printer_pipeline(text: str) -> str:
    #Differentiate between v1 and v2
    if version < 2:
        #v1: Use the previously saved variable
        printer_task = printer_op(text)
    else:
        #v2: Directly call the component
        printer_task = printer(text)
    return printer_task.output

#Call the general DSL compiler
kfp.compiler.Compiler().compile(printer_pipeline, package_path=f'out/v{version}_pipeline.yaml')