# unit forge — conversion engine (python)
UNITS = {
 'length': {'millimeter':0.001,'centimeter':0.01,'meter':1,'kilometer':1000,'inch':0.0254,'foot':0.3048,'yard':0.9144,'mile':1609.344,'nautical mile':1852},
 'weight': {'milligram':1e-6,'gram':0.001,'kilogram':1,'metric ton':1000,'ounce':0.0283495,'pound':0.453592,'stone':6.35029},
 'data': {'bit':1,'byte':8,'kilobyte':8e3,'megabyte':8e6,'gigabyte':8e9,'terabyte':8e12,'petabyte':8e12*8},
 'time': {'millisecond':0.001,'second':1,'minute':60,'hour':3600,'day':86400,'week':604800,'month':2629800,'year':31557600},
 'temperature': {'celsius':0,'fahrenheit':1,'kelvin':2},
 'volume': {'milliliter':0.001,'liter':1,'cubic meter':1000,'teaspoon':0.00492892,'tablespoon':0.0147868,'fluid ounce':0.0295735,'cup':0.236588,'pint':0.473176,'quart':0.946353,'gallon':3.78541},
 'speed': {'m/s':1,'km/h':0.277778,'mph':0.44704,'knots':0.514444,'mach':343},
 'pressure': {'pascal':1,'bar':100000,'psi':6894.76,'atm':101325,'mmhg':133.322,'kpa':1000},
}
CATS = list(UNITS.keys())
def convert(value, cat, frm, to):
    u = UNITS[cat]
    if cat == 'temperature':
        if frm == 'celsius': c = value
        elif frm == 'fahrenheit': c = (value - 32) * 5/9
        else: c = value - 273.15
        if to == 'celsius': return c
        if to == 'fahrenheit': return c * 9/5 + 32
        return c + 273.15
    return value * u[frm] / u[to]
def list_units(cat): return list(UNITS[cat].keys())
def list_cats(): return CATS
