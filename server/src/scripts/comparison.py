import kfp

#Überprüfung der aktuellen KFP Version anhand des ersten Zeichens der Versionsnummer
version = int(kfp.__version__[0])

#Erstellung einer Beispielkomponente, die einen Text ausgibt
@kfp.dsl.component
def printer(text: str) -> str:
    print(text)
    return text

#Unterscheidung zwischen v1 und v2
if version < 2:
    #v1: Speicherung der Komponente in einer Variable durch den Aufruf einer speziellen Funktion
    printer_op = kfp.components.create_component_from_func(printer, output_component_file='out/v1_component.yaml')
else:
    #v2: Aufruf des allgemeinen DSL Compilers
    kfp.compiler.Compiler().compile(printer, package_path='out/v2_component.yaml')

#Erstellung einer Pipeline, welche die zuvor erstellte Komponente nutzt
@kfp.dsl.pipeline()
def printer_pipeline(text: str) -> str:
    #Unterscheidung zwischen v1 und v2
    if version < 2:
        #v1: Nutzung der zuvor gespeicherten Variable
        printer_task = printer_op(text)
    else:
        #v2: Direkter Aufruf der Komponente
        printer_task = printer(text)
    return printer_task.output

#Aufruf des allgemeinen DSL Compilers
kfp.compiler.Compiler().compile(printer_pipeline, package_path=f'out/v{version}_pipeline.yaml')