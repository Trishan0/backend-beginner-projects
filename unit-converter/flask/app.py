from flask import Flask, render_template, request, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Required for flashing messages
app.jinja_env.auto_reload = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

    
# Length Units Dictionary
LENGTH_UNITS = {
    'cm': 'Centimeters',
    'm': 'Meters',
    'km': 'Kilometers',
    'inch': 'Inches',
    'ft': 'Feet',
    'mi': 'Miles'
}

# Weight Units Dictionary
WEIGHT_UNITS = {
    'kg': 'Kilograms',
    'g': 'Grams',
    'mg': 'Milligrams',
    'lb': 'Pounds',
    'oz': 'Ounces'
}

# Temperature Units Dictionary
TEMPERATURE_UNITS = {
    'C': 'Celsius',
    'F': 'Fahrenheit',
    'K': 'Kelvin'
}

# Length Conversion Rates Dictionary
LENGTH_CONVERSION_RATES = {
    'cm': 0.01,
    'm': 1,  # base unit
    'km': 1000,
    'inch': 0.0254,
    'ft': 0.3048,
    'mi': 1609.34,
}

# Weight Conversion Rates Dictionary
WEIGHT_CONVERSION_RATES = {
    'kg': 1,  # base unit
    'g': 0.001,
    'mg': 0.000001,
    'lb': 0.453592,
    'oz': 0.0283495,
}

def convert_temperature(value, from_unit, to_unit):
    # Convert to Celsius first (base unit)
    if from_unit == 'F':
        celsius = (value - 32) * 5/9
    elif from_unit == 'K':
        celsius = value - 273.15
    else:  # already Celsius
        celsius = value
    
    # Convert from Celsius to target unit
    if to_unit == 'F':
        return celsius * 9/5 + 32
    elif to_unit == 'K':
        return celsius + 273.15
    else:  # to Celsius
        return celsius
    
    
def get_unit_type(UNITS,unit):
    for units in UNITS.items():
        if unit in units:
            return unit

def convert(UNITS,template,CONVERSION_RATES=None):
    if request.method == 'POST':
        try:
            value = float(request.form.get('value'))
            from_unit = request.form.get('from_unit')
            to_unit = request.form.get('to_unit')
                        
            if from_unit in TEMPERATURE_UNITS:
                converted_value = convert_temperature(value, from_unit, to_unit)            
            else:
                from_rate = CONVERSION_RATES[from_unit]
                to_rate = CONVERSION_RATES[to_unit]
                converted_value = value * from_rate / to_rate
            
            return render_template(template, 
                                 units=UNITS,
                                 result=converted_value, 
                                 to_unit=to_unit,
                                 value=value,
                                 from_unit=from_unit)
        except (ValueError, TypeError):
            flash("Please enter a valid number", "error")
            return render_template(template, units=UNITS)
        except KeyError:
            flash("Invalid unit selection", "error")
            return render_template(template, units=UNITS)
    
    return render_template(template, units=UNITS)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')

@app.route('/length',methods=['GET', 'POST'])
def length():
    return convert(LENGTH_UNITS,'length.html',CONVERSION_RATES=LENGTH_CONVERSION_RATES)

@app.route('/weight',methods=['GET', 'POST'])
def weight():
    return convert(WEIGHT_UNITS,'weight.html',CONVERSION_RATES=WEIGHT_CONVERSION_RATES)

@app.route('/temperature',methods=['GET', 'POST'])
def temperature():
    return convert(TEMPERATURE_UNITS,'temperature.html')

if __name__ == '__main__':
    
    app.run(debug=True,host='0.0.0.0',port=5000)
    
